import { Day, Block, Exercise } from '../types';

/**
 * Manages the state of a workout session.
 * Tracks current position, progression, and provides navigation methods.
 */
export class SessionState {
  private day: Day | null = null;
  private blockIndex = 0;
  private exerciseIndex = 0;
  private setIndex = 0;
  private isRestingBetweenSets = false;
  private sessionStartTime = 0;

  /**
   * Initialize session with a workout day
   */
  initialize(day: Day): void {
    this.day = day;
    this.blockIndex = 0;
    this.exerciseIndex = 0;
    this.setIndex = 0;
    this.isRestingBetweenSets = false;
    this.sessionStartTime = Date.now();
  }

  /**
   * Get current workout day
   */
  getDay(): Day | null {
    return this.day;
  }

  /**
   * Get current block
   */
  getCurrentBlock(): Block | null {
    if (!this.day || this.blockIndex >= this.day.blocks.length) {
      return null;
    }
    return this.day.blocks[this.blockIndex];
  }

  /**
   * Get current exercise
   */
  getCurrentExercise(): Exercise | null {
    const block = this.getCurrentBlock();
    if (!block || this.exerciseIndex >= block.exercises.length) {
      return null;
    }
    return block.exercises[this.exerciseIndex];
  }

  /**
   * Get next exercise (for preview)
   */
  getNextExercise(): Exercise | null {
    const block = this.getCurrentBlock();
    if (!block) return null;

    // Check if there's another exercise in current block
    if (this.exerciseIndex + 1 < block.exercises.length) {
      return block.exercises[this.exerciseIndex + 1];
    }

    // Check next block
    if (this.day && this.blockIndex + 1 < this.day.blocks.length) {
      const nextBlock = this.day.blocks[this.blockIndex + 1];
      return nextBlock.exercises[0] || null;
    }

    return null;
  }

  /**
   * Get exercises for current interval (for compound exercises)
   */
  getCurrentIntervalExercises(): Exercise[] {
    const block = this.getCurrentBlock();
    if (!block || block.timerType !== 'interval') {
      return [];
    }

    const exercisesPerInterval = block.timerConfig?.exercisesPerInterval || 1;
    const startIdx = Math.floor(this.exerciseIndex / exercisesPerInterval) * exercisesPerInterval;
    return block.exercises.slice(startIdx, startIdx + exercisesPerInterval);
  }

  /**
   * Move to next set within current exercise
   */
  nextSet(): boolean {
    const exercise = this.getCurrentExercise();
    if (!exercise || !exercise.sets) return false;

    if (this.setIndex + 1 < exercise.sets) {
      this.setIndex++;
      this.isRestingBetweenSets = false;
      return true;
    }
    return false;
  }

  /**
   * Move to next exercise
   */
  nextExercise(): boolean {
    const block = this.getCurrentBlock();
    if (!block) return false;

    // Reset set index for new exercise
    this.setIndex = 0;
    this.isRestingBetweenSets = false;

    // Move to next exercise
    if (this.exerciseIndex + 1 < block.exercises.length) {
      this.exerciseIndex++;
      return true;
    }

    // Try moving to next block
    return this.nextBlock();
  }

  /**
   * Skip remaining exercises in an interval group
   */
  skipIntervalGroup(): boolean {
    const block = this.getCurrentBlock();
    if (!block || block.timerType !== 'interval') {
      return this.nextExercise();
    }

    const exercisesPerInterval = block.timerConfig?.exercisesPerInterval || 1;
    const currentGroup = Math.floor(this.exerciseIndex / exercisesPerInterval);
    const nextGroupStart = (currentGroup + 1) * exercisesPerInterval;

    if (nextGroupStart < block.exercises.length) {
      this.exerciseIndex = nextGroupStart;
      this.setIndex = 0;
      this.isRestingBetweenSets = false;
      return true;
    }

    return this.nextBlock();
  }

  /**
   * Move to next block
   */
  nextBlock(): boolean {
    if (!this.day || this.blockIndex + 1 >= this.day.blocks.length) {
      return false;
    }

    this.blockIndex++;
    this.exerciseIndex = 0;
    this.setIndex = 0;
    this.isRestingBetweenSets = false;
    return true;
  }

  /**
   * Check if session is complete
   */
  isComplete(): boolean {
    if (!this.day) return true;
    return this.blockIndex >= this.day.blocks.length;
  }

  /**
   * Get session progress info
   */
  getProgress(): { current: number; total: number; percentage: number } {
    if (!this.day) {
      return { current: 0, total: 0, percentage: 0 };
    }

    const totalExercises = this.day.blocks.reduce(
      (sum, block) => sum + block.exercises.length, 
      0
    );

    const completedExercises = this.day.blocks
      .slice(0, this.blockIndex)
      .reduce((sum, block) => sum + block.exercises.length, 0) + 
      this.exerciseIndex;

    const percentage = totalExercises > 0 
      ? Math.round((completedExercises / totalExercises) * 100)
      : 0;

    return {
      current: completedExercises,
      total: totalExercises,
      percentage
    };
  }

  /**
   * Get current indices for external use
   */
  getIndices(): {
    blockIndex: number;
    exerciseIndex: number;
    setIndex: number;
  } {
    return {
      blockIndex: this.blockIndex,
      exerciseIndex: this.exerciseIndex,
      setIndex: this.setIndex
    };
  }

  /**
   * Set rest state
   */
  setResting(resting: boolean): void {
    this.isRestingBetweenSets = resting;
  }

  /**
   * Check if currently resting
   */
  isResting(): boolean {
    return this.isRestingBetweenSets;
  }

  /**
   * Get current set number (1-based for display)
   */
  getCurrentSetNumber(): number {
    return this.setIndex + 1;
  }

  /**
   * Get session duration in milliseconds
   */
  getSessionDuration(): number {
    return Date.now() - this.sessionStartTime;
  }

  /**
   * Reset session state
   */
  reset(): void {
    this.blockIndex = 0;
    this.exerciseIndex = 0;
    this.setIndex = 0;
    this.isRestingBetweenSets = false;
    this.sessionStartTime = Date.now();
  }
}