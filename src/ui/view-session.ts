import { BaseTimer, TimerEvent } from '../timers/timer-engine';
import { TimerFactory } from '../timers/timer-factory';
import { Day, Block, Exercise } from '../types';
import { wakeLockManager } from '../utils/wake-lock';
import { backgroundTimerManager } from '../utils/background-timer';
import { feedbackManager } from '../utils/feedback';

export class ViewSession extends HTMLElement {
  private currentDay: Day | null = null;
  private currentBlockIndex = 0;
  private currentExerciseIndex = 0;
  private currentSetIndex = 0; // Track current set within exercise
  private currentTimer: BaseTimer | null = null;
  private sessionStartTime: number = 0;
  private foregroundCallback: (() => void) | null = null;
  private lastPhase: string | null = null;
  private isRestingBetweenSets = false; // Track if we're in rest period between sets

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
    this.currentSetIndex = 0;
    this.isRestingBetweenSets = false;
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

        .session-save-dialog h3 {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: var(--text-primary);
        }

        .session-save-dialog p {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0 0 8px 0;
        }

        .dialog-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .discard-btn, .save-btn {
          flex: 1;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .discard-btn {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }

        .discard-btn:hover {
          background: var(--border);
          color: var(--text-primary);
        }

        .save-btn {
          background: var(--accent);
          color: white;
        }

        .save-btn:hover {
          opacity: 0.9;
        }

        .cancel-session-btn {
          padding: 8px 16px;
          background: var(--bg-primary);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-session-btn:hover {
          background: var(--border);
          color: var(--text-primary);
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
        <div class="session-info">
          <div class="session-title">${this.currentDay.title}</div>
          <div class="session-progress">
            Block ${this.currentBlockIndex + 1} of ${totalBlocks} • 
            Exercise ${completedExercises + 1} of ${totalExercises}
          </div>
        </div>
        <button class="cancel-session-btn" id="cancel-session">Cancel</button>
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
    const exercise = this.getCurrentExercise();
    const block = this.getCurrentBlock();
    const hasBlockTimer = block?.timerType && block.timerType !== 'none';

    // For exercises with set-based rest periods
    if (!hasBlockTimer && exercise) {
      const totalSets = exercise.sets || 1;
      const setNumber = this.currentSetIndex + 1;

      if (this.isRestingBetweenSets && this.currentTimer) {
        const remaining = this.currentTimer.getRemainingInCurrentPeriod();
        const timerDisplay = BaseTimer.formatTime(remaining);
        const elapsed = this.currentTimer.getElapsedTime();
        const duration = this.currentTimer.getDuration();
        const progress = Math.min(elapsed / duration, 1);

        return `
          <div class="timer-section">
            <div class="timer-display">${timerDisplay}</div>
            <div class="timer-phase">Rest after Set ${setNumber - 1}</div>
            <div class="timer-progress">Set ${setNumber}/${totalSets} next</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress * 100}%"></div>
            </div>
          </div>
        `;
      }

      // Show set info when not resting
      return `
        <div class="timer-section">
          <div class="timer-display">Set ${setNumber}/${totalSets}</div>
          <div class="timer-phase">${exercise.reps} reps</div>
          ${exercise.restSec ? `<div class="timer-progress">${exercise.restSec}s rest after set</div>` : ''}
        </div>
      `;
    }

    // Handle block-level timers (EMOM, Circuit, etc.)
    if (!this.currentTimer) {
      return `
        <div class="timer-section">
          <div class="timer-display">--:--</div>
          <div class="timer-phase">Ready to start</div>
        </div>
      `;
    }

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
    const block = this.getCurrentBlock();
    const exercise = this.getCurrentExercise();
    const hasBlockTimer = block?.timerType && block.timerType !== 'none';
    
    // Handle block-level timers (EMOM, Circuit, etc.)
    if (hasBlockTimer) {
      const timerState = this.currentTimer?.getState() || 'idle';
      const isCompleted = timerState === 'completed';

      let primaryButton = '';
      if (!this.currentTimer || timerState === 'idle') {
        primaryButton = `<button class="control-btn primary" id="start-btn">Start Timer</button>`;
      } else if (timerState === 'running') {
        primaryButton = `<button class="control-btn warning" id="pause-btn">Pause</button>`;
      } else if (timerState === 'paused') {
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

    // Handle set-based exercises (no block timer, but sets with rest)
    if (!exercise) {
      return `<div class="session-controls"><button class="control-btn secondary" id="skip-btn">Skip</button></div>`;
    }

    const totalSets = exercise.sets || 1;
    const isRestingBetweenSets = this.isRestingBetweenSets;
    const timerState = this.currentTimer?.getState() || 'idle';

    // If we're resting between sets (timer running)
    if (isRestingBetweenSets && this.currentTimer) {
      if (timerState === 'running') {
        return `
          <div class="session-controls">
            <button class="control-btn warning" id="pause-btn">Pause Rest</button>
            <button class="control-btn secondary" id="skip-rest-btn">Skip Rest</button>
          </div>
        `;
      } else if (timerState === 'paused') {
        return `
          <div class="session-controls">
            <button class="control-btn primary" id="resume-btn">Resume Rest</button>
            <button class="control-btn secondary" id="skip-rest-btn">Skip Rest</button>
          </div>
        `;
      } else if (timerState === 'completed') {
        return `
          <div class="session-controls">
            <button class="control-btn primary" id="next-set-btn">Start Next Set</button>
          </div>
        `;
      }
    }

    // Default state: ready for next set
    const setNumber = this.currentSetIndex + 1;

    return `
      <div class="session-controls">
        <button class="control-btn primary" id="complete-set-btn">
          Complete Set ${setNumber}/${totalSets}
        </button>
        <button class="control-btn secondary" id="skip-btn">Skip Exercise</button>
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
    if (exercise.restSec) parts.push(`${exercise.restSec}s rest`);
    const timerLabel = block.timerType;
    if (timerLabel && timerLabel !== 'none') parts.push(`${timerLabel.toUpperCase()} format`);

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
    const hasTimer = block?.timerType && block.timerType !== 'none';
    if (!hasTimer) return 'Timer Running';

    // Check if timer is an interval type timer with multiple rounds
    if (this.currentTimer && this.currentTimer.getTotalRounds() > 1) {
      const phase = (this.currentTimer as any).getCurrentPhase?.();
      if (phase === 'work') return 'Work Period';
      if (phase === 'rest') return 'Rest Period';
    }

    return 'Timer Running';
  }

  private createTimerForCurrentBlock(): BaseTimer | null {
    const block = this.getCurrentBlock();
    if (!block?.timerType || block.timerType === 'none') return null;

    return TimerFactory.createTimer(block.timerType, block.timerConfig);
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
      } else if (target.id === 'complete-exercise-btn') {
        this.completeExercise();
      } else if (target.id === 'complete-set-btn') {
        this.completeSet();
      } else if (target.id === 'skip-rest-btn') {
        this.skipRest();
      } else if (target.id === 'next-set-btn') {
        this.startNextSet();
      } else if (target.id === 'next-btn') {
        this.nextExercise();
      } else if (target.id === 'finish-btn') {
        this.finishSession();
      } else if (target.id === 'cancel-session') {
        this.cancelSession();
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

  private completeExercise() {
    // For now, same behavior as skip - just advance to next exercise
    // TODO: Future enhancement could handle rest periods between exercises
    this.nextExercise();
  }

  private async completeSet() {
    const exercise = this.getCurrentExercise();
    if (!exercise) return;

    const totalSets = exercise.sets || 1;
    const isLastSet = this.currentSetIndex >= totalSets - 1;

    feedbackManager.setComplete();

    if (isLastSet) {
      // Exercise is complete, move to next exercise
      this.nextExercise();
    } else {
      // Start rest timer if exercise has rest time
      if (exercise.restSec && exercise.restSec > 0) {
        this.currentSetIndex++;
        this.isRestingBetweenSets = true;
        
        // Create rest timer
        this.currentTimer = TimerFactory.createRestTimer(exercise.restSec, 1);
        this.currentTimer.addCallback((event) => {
          if (event.type === 'complete') {
            this.handleRestComplete();
          } else if (event.type === 'tick') {
            // Update display on each tick
            this.updateTimerDisplay();
          }
        });
        
        // Start rest timer
        this.currentTimer.start();
        feedbackManager.restStart();
      } else {
        // No rest time, just move to next set
        this.currentSetIndex++;
      }
      
      this.render();
    }
  }

  private skipRest() {
    if (this.currentTimer) {
      this.currentTimer.stop();
      this.currentTimer = null;
    }
    this.handleRestComplete();
  }

  private startNextSet() {
    this.handleRestComplete();
  }

  private handleRestComplete() {
    this.isRestingBetweenSets = false;
    this.currentTimer?.stop();
    this.currentTimer = null;
    feedbackManager.restComplete();
    this.render();
  }

  private nextExercise() {
    const block = this.getCurrentBlock();
    if (!block) return;

    feedbackManager.exerciseComplete();

    this.currentTimer?.stop();
    this.currentTimer = null;

    // Reset set tracking for new exercise
    this.currentSetIndex = 0;
    this.isRestingBetweenSets = false;

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
    
    // Show save/discard dialog
    this.showSessionSaveDialog();
  }

  private showSessionSaveDialog() {
    const duration = this.sessionStartTime ? Math.round((performance.now() - this.sessionStartTime) / 1000) : 0;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (!this.shadowRoot) return;
    
    // Create overlay dialog
    const dialogHtml = `
      <div class="session-save-overlay">
        <div class="session-save-dialog">
          <h3>Session Complete!</h3>
          <p>Duration: ${durationText}</p>
          <p>Do you want to save this workout session?</p>
          
          <div class="dialog-actions">
            <button class="discard-btn" id="discard-session">
              Discard Session
            </button>
            <button class="save-btn" id="save-session">
              Save Session
            </button>
          </div>
        </div>
      </div>
    `;

    // Add dialog to shadow DOM
    const dialogElement = document.createElement('div');
    dialogElement.innerHTML = dialogHtml;
    this.shadowRoot.appendChild(dialogElement);

    // Add event listeners
    const discardBtn = this.shadowRoot.querySelector('#discard-session');
    const saveBtn = this.shadowRoot.querySelector('#save-session');

    discardBtn?.addEventListener('click', () => {
      this.discardSession();
    });

    saveBtn?.addEventListener('click', () => {
      this.saveSession();
    });
  }

  private discardSession() {
    console.log('Session discarded (not saved)');
    
    this.dispatchEvent(new CustomEvent('session-complete', {
      detail: {
        day: this.currentDay,
        duration: this.sessionStartTime ? performance.now() - this.sessionStartTime : 0,
        saved: false
      }
    }));
  }

  private saveSession() {
    console.log('Session saved');
    
    // TODO: Actually save session data to IndexedDB
    this.dispatchEvent(new CustomEvent('session-complete', {
      detail: {
        day: this.currentDay,
        duration: this.sessionStartTime ? performance.now() - this.sessionStartTime : 0,
        saved: true
      }
    }));
  }

  private async cancelSession() {
    const confirmed = confirm('Are you sure you want to cancel this session? Your progress will not be saved.');
    
    if (confirmed) {
      console.log('Session cancelled by user');
      await this.cleanup();
      
      this.dispatchEvent(new CustomEvent('session-complete', {
        detail: {
          day: this.currentDay,
          duration: this.sessionStartTime ? performance.now() - this.sessionStartTime : 0,
          saved: false,
          cancelled: true
        }
      }));
    }
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