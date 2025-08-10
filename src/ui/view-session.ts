import { BaseTimer, TimerEvent } from '../timers/timer-engine';
import { EMOMTimer } from '../timers/emom';
import { N90Timer } from '../timers/n90';
import { FixedRestTimer, TimedCircuitTimer } from '../timers/fixed-rest';
import { Day, Block, Exercise } from '../types';
import { wakeLockManager } from '../utils/wake-lock';
import { backgroundTimerManager } from '../utils/background-timer';
import { feedbackManager } from '../utils/feedback';

export class ViewSession extends HTMLElement {
  private currentDay: Day | null = null;
  private currentBlockIndex = 0;
  private currentExerciseIndex = 0;
  private currentTimer: BaseTimer | null = null;
  private sessionStartTime: number = 0;
  private foregroundCallback: (() => void) | null = null;
  private lastPhase: string | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.setupBackgroundHandling();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setDay(day: Day) {
    this.currentDay = day;
    this.currentBlockIndex = 0;
    this.currentExerciseIndex = 0;
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
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

        .exercise-name {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: var(--accent);
        }

        .exercise-details {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0 0 16px 0;
        }

        .timer-section {
          background: var(--bg-primary);
          padding: 32px 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .timer-display {
          font-size: 48px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          margin: 0 0 8px 0;
          color: var(--text-primary);
        }

        .timer-phase {
          font-size: 18px;
          font-weight: 500;
          margin: 0 0 8px 0;
          color: var(--accent);
        }

        .timer-progress {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 24px 0;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          margin: 16px 0;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 2px;
          transition: width 0.1s ease;
          width: 0%;
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

        .control-btn.warning {
          background: var(--warning);
          color: white;
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

        .next-up-label {
          font-size: 12px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 4px 0;
        }

        .next-up-exercise {
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

        .complete-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .complete-stats {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
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

      <div class="session-container">
        ${this.renderContent()}
      </div>
    `;
  }

  private renderContent(): string {
    if (!this.currentDay) {
      return `
        <div class="session-empty">
          <div>
            <h2>No Workout Selected</h2>
            <p>Select a day to start your session</p>
          </div>
        </div>
      `;
    }

    const currentBlock = this.getCurrentBlock();
    if (!currentBlock) {
      return this.renderSessionComplete();
    }

    const currentExercise = this.getCurrentExercise();
    if (!currentExercise) {
      return this.renderSessionComplete();
    }

    return `
      ${this.renderHeader()}
      <div class="session-main">
        ${this.renderCurrentExercise(currentExercise)}
        ${this.renderTimer()}
        ${this.renderControls()}
        ${this.renderNextUp()}
      </div>
    `;
  }

  private renderHeader(): string {
    if (!this.currentDay) return '';

    const totalBlocks = this.currentDay.blocks.length;
    const totalExercises = this.currentDay.blocks.reduce((sum, block) => sum + block.exercises.length, 0);
    const completedExercises = this.currentBlockIndex * (this.currentDay.blocks[0]?.exercises.length || 0) + this.currentExerciseIndex;

    return `
      <div class="session-header">
        <div class="session-title">${this.currentDay.name}</div>
        <div class="session-progress">
          Block ${this.currentBlockIndex + 1} of ${totalBlocks} • 
          Exercise ${completedExercises + 1} of ${totalExercises}
        </div>
      </div>
    `;
  }

  private renderCurrentExercise(exercise: Exercise): string {
    const block = this.getCurrentBlock();
    if (!block) return '';

    return `
      <div class="current-exercise">
        <div class="exercise-name">${exercise.name}</div>
        <div class="exercise-details">${this.formatExerciseDetails(exercise, block)}</div>
      </div>
    `;
  }

  private renderTimer(): string {
    const timerState = this.currentTimer?.getState() || 'idle';
    const isRunning = timerState === 'running';
    const isPaused = timerState === 'paused';

    if (!this.currentTimer) {
      return `
        <div class="timer-section">
          <div class="timer-display">--:--</div>
          <div class="timer-phase">Ready to start</div>
        </div>
      `;
    }

    const elapsed = this.currentTimer.getElapsedTime();
    const remaining = this.currentTimer.getRemainingInCurrentPeriod();
    const currentRound = this.currentTimer.getCurrentRound();
    const totalRounds = this.currentTimer.getTotalRounds();

    const timerDisplay = BaseTimer.formatTime(remaining);
    const progress = this.getTimerProgress();
    const phase = this.getTimerPhase();

    return `
      <div class="timer-section">
        <div class="timer-display">${timerDisplay}</div>
        <div class="timer-phase">${phase}</div>
        <div class="timer-progress">Round ${currentRound} of ${totalRounds}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress * 100}%"></div>
        </div>
      </div>
    `;
  }

  private renderControls(): string {
    const timerState = this.currentTimer?.getState() || 'idle';
    const isRunning = timerState === 'running';
    const isPaused = timerState === 'paused';
    const isCompleted = timerState === 'completed';

    let primaryButton = '';
    if (!this.currentTimer || timerState === 'idle') {
      primaryButton = `<button class="control-btn primary" id="start-btn">Start Timer</button>`;
    } else if (isRunning) {
      primaryButton = `<button class="control-btn warning" id="pause-btn">Pause</button>`;
    } else if (isPaused) {
      primaryButton = `<button class="control-btn primary" id="resume-btn">Resume</button>`;
    } else if (isCompleted) {
      primaryButton = `<button class="control-btn primary" id="next-btn">Next Exercise</button>`;
    }

    return `
      <div class="session-controls">
        ${primaryButton}
        <button class="control-btn secondary" id="reset-btn" ${(!this.currentTimer || timerState === 'idle') ? 'disabled' : ''}>Reset</button>
        <button class="control-btn secondary" id="skip-btn">Skip</button>
      </div>
    `;
  }

  private renderNextUp(): string {
    const nextExercise = this.getNextExercise();
    if (!nextExercise) {
      return `
        <div class="next-up">
          <div class="next-up-label">Next Up</div>
          <div class="next-up-exercise">Session Complete!</div>
        </div>
      `;
    }

    return `
      <div class="next-up">
        <div class="next-up-label">Next Up</div>
        <div class="next-up-exercise">${nextExercise.name}</div>
      </div>
    `;
  }

  private renderSessionComplete(): string {
    const duration = this.sessionStartTime ? performance.now() - this.sessionStartTime : 0;
    const formattedDuration = BaseTimer.formatTime(duration);

    return `
      <div class="session-complete">
        <div class="complete-icon">🎉</div>
        <div class="complete-title">Workout Complete!</div>
        <div class="complete-stats">Duration: ${formattedDuration}</div>
        <div class="session-controls">
          <button class="control-btn primary" id="finish-btn">Finish Session</button>
        </div>
      </div>
    `;
  }

  private getCurrentBlock(): Block | null {
    if (!this.currentDay || this.currentBlockIndex >= this.currentDay.blocks.length) {
      return null;
    }
    return this.currentDay.blocks[this.currentBlockIndex];
  }

  private getCurrentExercise(): Exercise | null {
    const block = this.getCurrentBlock();
    if (!block || this.currentExerciseIndex >= block.exercises.length) {
      return null;
    }
    return block.exercises[this.currentExerciseIndex];
  }

  private getNextExercise(): Exercise | null {
    const block = this.getCurrentBlock();
    if (!block) return null;

    // Check if there's a next exercise in current block
    if (this.currentExerciseIndex + 1 < block.exercises.length) {
      return block.exercises[this.currentExerciseIndex + 1];
    }

    // Check if there's a next block
    if (!this.currentDay || this.currentBlockIndex + 1 >= this.currentDay.blocks.length) {
      return null;
    }

    const nextBlock = this.currentDay.blocks[this.currentBlockIndex + 1];
    return nextBlock.exercises[0] || null;
  }

  private formatExerciseDetails(exercise: Exercise, block: Block): string {
    const parts = [];
    
    if (exercise.sets) parts.push(`${exercise.sets} sets`);
    if (exercise.reps) parts.push(`${exercise.reps} reps`);
    if (exercise.weight) parts.push(`${exercise.weight}`);
    if (exercise.duration) parts.push(`${exercise.duration}`);
    if (block.timer) parts.push(`${block.timer.toUpperCase()} format`);

    return parts.join(' • ');
  }

  private getTimerProgress(): number {
    if (!this.currentTimer) return 0;

    const elapsed = this.currentTimer.getElapsedTime();
    const total = this.currentTimer.getDuration();
    return Math.min(elapsed / total, 1);
  }

  private getTimerPhase(): string {
    if (!this.currentTimer) return 'Ready';

    const block = this.getCurrentBlock();
    if (!block?.timer) return 'Timer Running';

    if (this.currentTimer instanceof N90Timer || this.currentTimer instanceof TimedCircuitTimer) {
      const phase = (this.currentTimer as any).getCurrentPhase?.();
      if (phase === 'work') return 'Work Period';
      if (phase === 'rest') return 'Rest Period';
    }

    return 'Timer Running';
  }

  private createTimerForCurrentBlock(): BaseTimer | null {
    const block = this.getCurrentBlock();
    if (!block?.timer) return null;

    const rounds = block.exercises.length;

    switch (block.timer.toLowerCase()) {
      case 'emom':
        return EMOMTimer.createEMOM(rounds);
      case 'e2mom':
        return EMOMTimer.createE2MOM(rounds);
      case 'e4mom':
        return EMOMTimer.createE4MOM(rounds);
      case 'n90':
        return N90Timer.create(rounds);
      case 'circuit':
        return TimedCircuitTimer.createTabata(rounds);
      case 'rest':
        return FixedRestTimer.create(180); // 3 minutes default rest
      default:
        return null;
    }
  }

  private setupEventListeners() {
    if (!this.shadowRoot) return;

    this.shadowRoot.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.id === 'start-btn') {
        this.startTimer();
      } else if (target.id === 'pause-btn') {
        this.pauseTimer();
      } else if (target.id === 'resume-btn') {
        this.resumeTimer();
      } else if (target.id === 'reset-btn') {
        this.resetTimer();
      } else if (target.id === 'skip-btn') {
        this.skipExercise();
      } else if (target.id === 'next-btn') {
        this.nextExercise();
      } else if (target.id === 'finish-btn') {
        this.finishSession();
      }
    });
  }

  private async startTimer() {
    if (!this.sessionStartTime) {
      this.sessionStartTime = performance.now();
      // Request notification permission when starting first timer
      await backgroundTimerManager.requestNotificationPermission();
    }

    // Acquire wake lock to keep screen active
    await wakeLockManager.acquire();

    this.currentTimer = this.createTimerForCurrentBlock();
    if (!this.currentTimer) return;

    this.currentTimer.addCallback((event: TimerEvent) => {
      this.handleTimerEvent(event);
    });

    this.currentTimer.start();
    feedbackManager.timerStart();
    this.render();
  }

  private pauseTimer() {
    this.currentTimer?.pause();
    feedbackManager.timerPause();
    this.render();
  }

  private resumeTimer() {
    this.currentTimer?.start();
    feedbackManager.timerStart();
    this.render();
  }

  private resetTimer() {
    this.currentTimer?.reset();
    this.render();
  }

  private skipExercise() {
    this.nextExercise();
  }

  private nextExercise() {
    const block = this.getCurrentBlock();
    if (!block) return;

    feedbackManager.exerciseComplete();

    this.currentTimer?.stop();
    this.currentTimer = null;

    // Move to next exercise in current block
    if (this.currentExerciseIndex + 1 < block.exercises.length) {
      this.currentExerciseIndex++;
    } else {
      // Move to next block
      this.currentBlockIndex++;
      this.currentExerciseIndex = 0;
    }

    this.render();
  }

  private async finishSession() {
    feedbackManager.sessionComplete();
    await this.cleanup();
    
    this.dispatchEvent(new CustomEvent('session-complete', {
      detail: {
        day: this.currentDay,
        duration: this.sessionStartTime ? performance.now() - this.sessionStartTime : 0
      }
    }));
  }

  private setupBackgroundHandling() {
    // Set up callback for when app returns to foreground
    this.foregroundCallback = () => {
      // Re-acquire wake lock if we had one and it was lost
      if (this.currentTimer?.getState() === 'running') {
        wakeLockManager.reacquire();
      }
      
      // Update display in case timer kept running in background
      this.updateTimerDisplay();
    };

    backgroundTimerManager.addForegroundCallback(this.foregroundCallback);
  }

  private async cleanup() {
    // Stop timer
    if (this.currentTimer) {
      this.currentTimer.stop();
      this.currentTimer = null;
    }

    // Release wake lock
    await wakeLockManager.release();

    // Remove background callback
    if (this.foregroundCallback) {
      backgroundTimerManager.removeForegroundCallback(this.foregroundCallback);
      this.foregroundCallback = null;
    }
  }

  private handleTimerEvent(event: TimerEvent) {
    if (event.type === 'tick') {
      this.updateTimerDisplay();
      this.checkForPhaseChange();
      this.checkForCountdownWarning(event.remaining);
    } else if (event.type === 'complete') {
      feedbackManager.exerciseComplete();
      this.render(); // Re-render to show "Next Exercise" button
    } else if (event.type === 'roundComplete') {
      feedbackManager.roundComplete();
    }
  }

  private checkForPhaseChange() {
    const currentPhase = this.getTimerPhase();
    
    if (this.lastPhase && this.lastPhase !== currentPhase) {
      if (currentPhase === 'Work Period') {
        feedbackManager.workPeriodStart();
      } else if (currentPhase === 'Rest Period') {
        feedbackManager.restPeriodStart();
      }
    }
    
    this.lastPhase = currentPhase;
  }

  private checkForCountdownWarning(remaining: number) {
    // Warn at 3, 2, 1 seconds remaining
    const secondsRemaining = Math.ceil(remaining / 1000);
    
    if (secondsRemaining <= 3 && secondsRemaining > 0) {
      const lastWarnTime = (this as any).lastWarnTime || 0;
      const currentTime = performance.now();
      
      // Only warn once per second
      if (currentTime - lastWarnTime > 900) {
        feedbackManager.countdownWarning();
        (this as any).lastWarnTime = currentTime;
      }
    }
  }

  private updateTimerDisplay() {
    if (!this.shadowRoot || !this.currentTimer) return;

    const timerDisplay = this.shadowRoot.querySelector('.timer-display');
    const progressFill = this.shadowRoot.querySelector('.progress-fill') as HTMLElement;
    const timerProgress = this.shadowRoot.querySelector('.timer-progress');
    const timerPhase = this.shadowRoot.querySelector('.timer-phase');

    if (timerDisplay) {
      const remaining = this.currentTimer.getRemainingInCurrentPeriod();
      timerDisplay.textContent = BaseTimer.formatTime(remaining);
    }

    if (progressFill) {
      const progress = this.getTimerProgress();
      progressFill.style.width = `${progress * 100}%`;
    }

    if (timerProgress) {
      const currentRound = this.currentTimer.getCurrentRound();
      const totalRounds = this.currentTimer.getTotalRounds();
      timerProgress.textContent = `Round ${currentRound} of ${totalRounds}`;
    }

    if (timerPhase) {
      timerPhase.textContent = this.getTimerPhase();
    }
  }
}

customElements.define('view-session', ViewSession);