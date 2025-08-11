import { BaseComponent } from './base-component';
import { SessionState } from './session-state';
import { SessionRenderer } from './session-renderer';
import { BaseTimer, TimerEvent } from '../timers/timer-engine';
import { TimerFactory } from '../timers/timer-factory';
import { Day } from '../types';
import { wakeLockManager } from '../utils/wake-lock';
import { backgroundTimerManager } from '../utils/background-timer';
import { feedbackManager } from '../utils/feedback';

/**
 * ViewSession component using modular architecture
 */
export class ViewSession extends BaseComponent {
  private state = new SessionState();
  private currentTimer: BaseTimer | null = null;
  private foregroundCallback: (() => void) | null = null;
  private timerDisplay: any = null;

  protected render(): void {
    // Base styles
    this.setHTML(`
      <style>
        :host {
          display: block;
          height: 100%;
          padding: 0;
        }

        .session-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-primary);
        }

        .session-header {
          background: var(--bg-secondary);
          padding: 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .session-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .session-progress {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          margin: 8px 0;
          overflow: hidden;
        }

        .progress-bar::after {
          content: '';
          display: block;
          height: 100%;
          background: var(--accent);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .session-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .current-exercise {
          background: var(--bg-secondary);
          padding: 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .exercise-group {
          margin-bottom: 16px;
        }

        .exercise-group:last-child {
          margin-bottom: 0;
        }

        .exercise-name {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: var(--accent);
        }

        .exercise-details {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
        }

        .exercise-cues {
          font-style: italic;
          opacity: 0.8;
        }

        .timer-info {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 8px 0;
          text-align: center;
        }

        .set-counter {
          font-size: 18px;
          font-weight: 600;
          margin-top: 12px;
          color: var(--text-primary);
        }

        .rest-timer {
          padding: 32px 20px;
          text-align: center;
        }

        .rest-label {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .rest-countdown {
          font-size: 48px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          margin: 10px 0;
        }

        .session-controls {
          padding: 20px;
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-shrink: 0;
        }

        .control-btn {
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 100px;
        }

        .control-btn.primary {
          background: var(--accent);
          color: white;
        }

        .control-btn.secondary {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }

        .control-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .next-up {
          padding: 16px 20px;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .next-label {
          font-size: 12px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 4px 0;
        }

        .next-exercise {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
        }

        .session-empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--text-secondary);
          padding: 40px 20px;
        }

        .session-complete {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
        }

        .complete-icon {
          font-size: 64px;
          margin: 0 0 16px 0;
        }

        .session-save-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .session-save-dialog {
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          margin: 16px;
          text-align: center;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .dialog-buttons {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --bg-primary: #000000;
            --bg-secondary: #1a1a1a;
            --text-primary: #ffffff;
            --text-secondary: #999999;
            --border: #333333;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }

        @media (prefers-color-scheme: light) {
          :host {
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
            --text-primary: #000000;
            --text-secondary: #666666;
            --border: #e0e0e0;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }
      </style>

      <div class="session-container" id="container">
        <!-- Content will be rendered here -->
      </div>
    `);

    this.updateContent();
  }

  /**
   * Set the workout day
   */
  setDay(day: Day): void {
    this.state.initialize(day);
    this.updateContent();
  }

  /**
   * Update the content based on current state
   */
  private updateContent(): void {
    const container = this.$('#container');
    if (!container) return;

    const day = this.state.getDay();
    
    // No day loaded
    if (!day) {
      container.innerHTML = SessionRenderer.renderEmpty();
      return;
    }

    // Session complete
    if (this.state.isComplete()) {
      container.innerHTML = SessionRenderer.renderSessionComplete();
      return;
    }

    // Get current state
    const block = this.state.getCurrentBlock();
    const isInterval = block?.timerType === 'interval' && 
                       block.timerConfig?.exercisesPerInterval && 
                       block.timerConfig.exercisesPerInterval > 1;
    
    const exercises = isInterval 
      ? this.state.getCurrentIntervalExercises()
      : (this.state.getCurrentExercise() ? [this.state.getCurrentExercise()!] : []);

    const nextExercise = this.state.getNextExercise();
    const progress = this.state.getProgress();

    // Handle rest between sets
    if (this.state.isResting() && this.currentTimer) {
      const event = (this.currentTimer as any).lastEvent;
      if (event) {
        const remainingSeconds = Math.ceil(event.remaining / 1000);
        container.innerHTML = SessionRenderer.renderContainer({
          header: SessionRenderer.renderHeader(day, progress),
          exercises: SessionRenderer.renderCurrentExercises(exercises, block, this.state.getCurrentSetNumber()),
          timer: SessionRenderer.renderRestTimer(remainingSeconds),
          nextUp: SessionRenderer.renderNextUp(nextExercise)
        });
        return;
      }
    }

    // Render sections
    const sections = {
      header: SessionRenderer.renderHeader(day, progress),
      exercises: SessionRenderer.renderCurrentExercises(exercises, block, this.state.getCurrentSetNumber()),
      timerInfo: SessionRenderer.renderTimerInfo(block),
      timer: '<timer-display id="timer-display"></timer-display>',
      controls: this.renderControlsForState(),
      nextUp: SessionRenderer.renderNextUp(nextExercise)
    };

    container.innerHTML = SessionRenderer.renderContainer(sections);

    // Update timer display component
    this.timerDisplay = this.$('#timer-display');
    if (this.timerDisplay && this.currentTimer) {
      // Get latest timer event if available
      const lastEvent = (this.currentTimer as any).lastEvent;
      if (lastEvent) {
        this.timerDisplay.updateFromEvent(lastEvent);
      }
    }
  }

  /**
   * Render controls based on current state
   */
  private renderControlsForState(): string {
    const block = this.state.getCurrentBlock();
    const hasTimer = block?.timerType && block.timerType !== 'none';
    const isInterval = block?.timerType === 'interval';
    const hasMultiple = block?.timerConfig?.exercisesPerInterval && 
                       block.timerConfig.exercisesPerInterval > 1;
    
    const timerState = this.currentTimer?.getState() || 'idle';
    const isRunning = timerState === 'running';
    const isPaused = timerState === 'paused';
    const isResting = this.state.isResting();

    return SessionRenderer.renderControls(
      isRunning,
      isPaused,
      isResting,
      !!hasTimer,
      !!isInterval,
      !!hasMultiple
    );
  }

  protected setupEventListeners(): void {
    this.shadow.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const action = target.dataset.action;

      switch(action) {
        case 'start':
          this.startTimer();
          break;
        case 'pause':
          this.pauseTimer();
          break;
        case 'resume':
          this.resumeTimer();
          break;
        case 'reset':
          this.resetTimer();
          break;
        case 'skip':
        case 'skip-group':
          this.skipExercise();
          break;
        case 'complete-set':
          this.completeSet();
          break;
        case 'skip-rest':
          this.skipRest();
          break;
        case 'finish':
          this.finishSession();
          break;
        case 'save':
          this.saveSession();
          break;
        case 'discard':
          this.discardSession();
          break;
      }
    });

    this.setupBackgroundHandling();
  }

  private async startTimer(): Promise<void> {
    await wakeLockManager.acquire();

    const block = this.state.getCurrentBlock();
    if (!block) return;

    this.currentTimer = this.createTimerForCurrentBlock();
    if (!this.currentTimer) return;

    this.currentTimer.addCallback((event: TimerEvent) => {
      this.handleTimerEvent(event);
    });

    this.currentTimer.start();
    feedbackManager.timerStart();
    
    // Immediately get initial timer state for display
    // The timer's first tick happens after tickInterval, so we need this for immediate feedback
    if (this.currentTimer) {
      const duration = (this.currentTimer as any).getDuration ? (this.currentTimer as any).getDuration() : 0;
      const totalRounds = (this.currentTimer as any).getTotalRounds ? (this.currentTimer as any).getTotalRounds() : 1;
      const initialEvent: TimerEvent = {
        type: 'tick',
        elapsed: 0,
        remaining: duration,
        round: 1,
        totalRounds: totalRounds,
        state: 'running'
      };
      (this.currentTimer as any).lastEvent = initialEvent;
    }
    
    this.updateContent();
  }

  private pauseTimer(): void {
    this.currentTimer?.pause();
    feedbackManager.timerPause();
    this.updateContent();
  }

  private resumeTimer(): void {
    this.currentTimer?.start();
    feedbackManager.timerStart();
    this.updateContent();
  }

  private resetTimer(): void {
    this.currentTimer?.reset();
    this.updateContent();
  }

  private skipExercise(): void {
    const block = this.state.getCurrentBlock();
    if (block?.timerType === 'interval' && block.timerConfig?.exercisesPerInterval && 
        block.timerConfig.exercisesPerInterval > 1) {
      this.state.skipIntervalGroup();
    } else {
      this.state.nextExercise();
    }
    
    this.currentTimer?.stop();
    this.currentTimer = null;
    this.updateContent();
  }

  private async completeSet(): Promise<void> {
    const exercise = this.state.getCurrentExercise();
    if (!exercise) return;

    feedbackManager.setComplete();

    const hasMoreSets = this.state.nextSet();
    
    if (!hasMoreSets) {
      // Exercise complete, move to next
      this.state.nextExercise();
      this.updateContent();
    } else if (exercise.restSec && exercise.restSec > 0) {
      // Start rest timer
      this.state.setResting(true);
      this.currentTimer = TimerFactory.createRestTimer(exercise.restSec, 1);
      
      this.currentTimer.addCallback((event) => {
        if (event.type === 'complete') {
          this.handleRestComplete();
        } else if (event.type === 'tick') {
          // Store event for display
          (this.currentTimer as any).lastEvent = event;
          this.updateContent();
        }
      });
      
      this.currentTimer.start();
      feedbackManager.restStart();
      this.updateContent();
    } else {
      // No rest, just update display
      this.updateContent();
    }
  }

  private skipRest(): void {
    this.currentTimer?.stop();
    this.currentTimer = null;
    this.handleRestComplete();
  }

  private handleRestComplete(): void {
    this.state.setResting(false);
    this.currentTimer = null;
    feedbackManager.restComplete();
    this.updateContent();
  }

  private createTimerForCurrentBlock(): BaseTimer | null {
    const block = this.state.getCurrentBlock();
    if (!block?.timerType || block.timerType === 'none') return null;

    // Adjust rounds for interval timers
    if (block.timerType === 'interval' && block.timerConfig?.exercisesPerInterval && 
        block.timerConfig.exercisesPerInterval > 1) {
      const indices = this.state.getIndices();
      const exercisesPerInterval = block.timerConfig.exercisesPerInterval;
      const currentRoundIndex = Math.floor(indices.exerciseIndex / exercisesPerInterval);
      const totalRounds = Math.ceil(block.exercises.length / exercisesPerInterval);
      const remainingRounds = totalRounds - currentRoundIndex;
      
      return TimerFactory.createTimer(block.timerType, {
        ...block.timerConfig,
        rounds: remainingRounds
      });
    }

    return TimerFactory.createTimer(block.timerType, block.timerConfig);
  }

  private handleTimerEvent(event: TimerEvent): void {
    // Update timer display
    if (this.timerDisplay) {
      this.timerDisplay.updateFromEvent(event);
    }

    // Store event for later use
    (this.currentTimer as any).lastEvent = event;

    if (event.type === 'tick') {
      this.checkForCountdownWarning(event.remaining);
    } else if (event.type === 'complete') {
      feedbackManager.exerciseComplete();
      this.updateContent();
    } else if (event.type === 'roundComplete') {
      feedbackManager.roundComplete();
    }
  }

  private checkForCountdownWarning(remaining: number): void {
    const secondsRemaining = Math.ceil(remaining / 1000);
    
    if (secondsRemaining <= 3 && secondsRemaining > 0) {
      const lastWarnTime = (this as any).lastWarnTime || 0;
      const currentTime = performance.now();
      
      if (currentTime - lastWarnTime > 900) {
        feedbackManager.countdownWarning();
        (this as any).lastWarnTime = currentTime;
      }
    }
  }

  private async finishSession(): Promise<void> {
    feedbackManager.sessionComplete();
    await this.cleanup();
    this.showSaveDialog();
  }

  private showSaveDialog(): void {
    const container = this.$('#container');
    if (container) {
      const dialogHtml = SessionRenderer.renderSaveDialog();
      const overlay = document.createElement('div');
      overlay.innerHTML = dialogHtml;
      container.appendChild(overlay.firstElementChild!);
    }
  }

  private saveSession(): void {
    console.log('Session saved');
    // TODO: Actually save to IndexedDB
    
    this.emit('session-complete', {
      day: this.state.getDay(),
      duration: this.state.getSessionDuration(),
      saved: true
    });
  }

  private discardSession(): void {
    console.log('Session discarded');
    
    this.emit('session-complete', {
      day: this.state.getDay(),
      duration: this.state.getSessionDuration(),
      saved: false
    });
  }

  private setupBackgroundHandling(): void {
    this.foregroundCallback = () => {
      if (this.currentTimer?.getState() === 'running') {
        wakeLockManager.reacquire();
      }
      this.updateContent();
    };

    backgroundTimerManager.addForegroundCallback(this.foregroundCallback);
  }

  protected cleanup(): void {
    if (this.currentTimer) {
      this.currentTimer.stop();
      this.currentTimer = null;
    }

    wakeLockManager.release();

    if (this.foregroundCallback) {
      backgroundTimerManager.removeForegroundCallback(this.foregroundCallback);
      this.foregroundCallback = null;
    }
  }
}

customElements.define('view-session', ViewSession);