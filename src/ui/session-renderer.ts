import { Day, Block, Exercise } from '../types';

/**
 * Handles all HTML rendering for the session view.
 * Pure functions that take data and return HTML strings.
 */
export class SessionRenderer {
  /**
   * Render the session header with title and progress
   */
  static renderHeader(day: Day | null, progress: { percentage: number }): string {
    if (!day) return '';

    return `
      <div class="session-header">
        <div class="session-title">${day.title}</div>
        <div class="session-progress">
          <div class="progress-bar" style="width: ${progress.percentage}%"></div>
        </div>
      </div>
    `;
  }

  /**
   * Render current exercises (handles compound exercises for intervals)
   */
  static renderCurrentExercises(
    exercises: Exercise[], 
    block: Block | null,
    setNumber?: number
  ): string {
    if (!exercises.length || !block) return '';

    // Multiple exercises (compound/interval)
    if (exercises.length > 1) {
      return `
        <div class="current-exercise">
          ${exercises.map(ex => `
            <div class="exercise-group">
              <div class="exercise-name">${ex.name}</div>
              <div class="exercise-details">${this.formatExerciseDetails(ex, block)}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Single exercise
    const exercise = exercises[0];
    const setInfo = setNumber && exercise.sets 
      ? `<div class="set-counter">Set ${setNumber} of ${exercise.sets}</div>`
      : '';

    return `
      <div class="current-exercise">
        <div class="exercise-name">${exercise.name}</div>
        <div class="exercise-details">${this.formatExerciseDetails(exercise, block)}</div>
        ${setInfo}
      </div>
    `;
  }

  /**
   * Render timer information for interval blocks
   */
  static renderTimerInfo(block: Block | null): string {
    if (!block || !block.timerConfig) return '';

    const config = block.timerConfig;
    let info = '';

    if (block.timerType === 'interval' && config.intervalSec) {
      const minutes = config.intervalSec >= 60 ? Math.floor(config.intervalSec / 60) : 0;
      const timeStr = minutes > 0 ? `${minutes} min` : `${config.intervalSec}s`;
      const exerciseCount = config.exercisesPerInterval || 1;
      const exerciseStr = exerciseCount > 1 ? `${exerciseCount} exercises` : '1 exercise';
      
      info = `Every ${timeStr} • ${exerciseStr} per interval`;
    } else if (block.timerType === 'work_rest') {
      info = config.workSec ? `Work: ${config.workSec}s` : '';
      if (config.restSec) {
        info += info ? ` • Rest: ${config.restSec}s` : `Rest: ${config.restSec}s`;
      }
    } else if (block.timerType === 'circuit' && config.stations) {
      info = `${config.stations.length} stations`;
    }

    return info ? `<div class="timer-info">${info}</div>` : '';
  }

  /**
   * Render control buttons based on current state
   */
  static renderControls(
    isRunning: boolean,
    isPaused: boolean,
    isResting: boolean,
    hasTimer: boolean,
    isIntervalBlock: boolean,
    hasMultipleExercises: boolean
  ): string {
    const buttons: string[] = [];

    if (hasTimer) {
      if (!isRunning) {
        const label = isIntervalBlock ? 'Start Round' : 'Start Exercise';
        buttons.push(`
          <button class="control-btn primary" data-action="start">
            ${label}
          </button>
        `);
      } else if (isPaused) {
        buttons.push(`
          <button class="control-btn primary" data-action="resume">
            Resume
          </button>
        `);
      } else {
        buttons.push(`
          <button class="control-btn secondary" data-action="pause">
            Pause
          </button>
        `);
      }

      if (isRunning || isPaused) {
        buttons.push(`
          <button class="control-btn secondary" data-action="reset">
            Reset
          </button>
        `);
      }
    } else if (isResting) {
      buttons.push(`
        <button class="control-btn primary" data-action="skip-rest">
          Skip Rest
        </button>
      `);
    } else {
      buttons.push(`
        <button class="control-btn primary" data-action="complete-set">
          Complete Set
        </button>
      `);
    }

    // Skip button
    if (isIntervalBlock && hasMultipleExercises) {
      buttons.push(`
        <button class="control-btn secondary" data-action="skip-group">
          Skip Round
        </button>
      `);
    } else {
      buttons.push(`
        <button class="control-btn secondary" data-action="skip">
          Skip Exercise
        </button>
      `);
    }

    return `
      <div class="session-controls">
        ${buttons.join('')}
      </div>
    `;
  }

  /**
   * Render next up preview
   */
  static renderNextUp(exercise: Exercise | null): string {
    if (!exercise) return '';

    return `
      <div class="next-up">
        <div class="next-label">Next Up</div>
        <div class="next-exercise">${exercise.name}</div>
      </div>
    `;
  }

  /**
   * Render session complete screen
   */
  static renderSessionComplete(): string {
    return `
      <div class="session-complete">
        <div class="complete-icon">✓</div>
        <h2>Workout Complete!</h2>
        <p>Great job! Your workout has been completed.</p>
        <button class="control-btn primary" data-action="finish">
          Finish Session
        </button>
      </div>
    `;
  }

  /**
   * Render save/discard dialog
   */
  static renderSaveDialog(): string {
    return `
      <div class="session-save-overlay">
        <div class="session-save-dialog">
          <h3>Save Workout?</h3>
          <p>Would you like to save this workout session?</p>
          <div class="dialog-buttons">
            <button class="control-btn primary" data-action="save">
              Save Session
            </button>
            <button class="control-btn secondary" data-action="discard">
              Discard
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render rest timer display
   */
  static renderRestTimer(remainingSeconds: number): string {
    return `
      <div class="rest-timer">
        <div class="rest-label">REST</div>
        <div class="rest-countdown">${remainingSeconds}</div>
        <button class="control-btn secondary" data-action="skip-rest">
          Skip Rest
        </button>
      </div>
    `;
  }

  /**
   * Format exercise details (sets x reps, cues)
   */
  private static formatExerciseDetails(exercise: Exercise, block: Block): string {
    const parts: string[] = [];
    
    if (block.timerType === 'interval' && block.timerConfig?.rounds) {
      parts.push(`${block.timerConfig.rounds} rounds × ${exercise.reps || '?'} reps`);
    } else if (exercise.sets && exercise.reps) {
      parts.push(`${exercise.sets} × ${exercise.reps}`);
    } else if (exercise.reps) {
      parts.push(exercise.reps);
    }

    if (exercise.cues) {
      parts.push(`<span class="exercise-cues">${exercise.cues}</span>`);
    }

    return parts.join(' • ');
  }

  /**
   * Render the main session container with all sections
   */
  static renderContainer(sections: {
    header?: string;
    exercises?: string;
    timerInfo?: string;
    timer?: string;
    controls?: string;
    nextUp?: string;
  }): string {
    return `
      <div class="session-container">
        ${sections.header || ''}
        <div class="session-main">
          ${sections.exercises || ''}
          ${sections.timerInfo || ''}
          ${sections.timer || '<div id="timer-display"></div>'}
          ${sections.controls || ''}
          ${sections.nextUp || ''}
        </div>
      </div>
    `;
  }

  /**
   * Render empty state
   */
  static renderEmpty(): string {
    return `
      <div class="session-empty">
        <p>No workout loaded</p>
      </div>
    `;
  }
}