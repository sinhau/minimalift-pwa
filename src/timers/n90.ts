import { BaseTimer } from './timer-engine';

/**
 * N90 Timer - Every 90 seconds for 5 sets
 * Used for specific strength exercises in the Minimalift program
 */
export class N90Timer extends BaseTimer {
  private readonly periodDurationMs = 90 * 1000; // 90 seconds
  private readonly defaultRounds = 5;

  constructor(private readonly totalRounds: number = 5) {
    super(100); // 100ms tick interval
  }

  getDuration(): number {
    return this.periodDurationMs * this.totalRounds;
  }

  getCurrentRound(): number {
    const elapsed = this.getElapsedTime();
    return Math.floor(elapsed / this.periodDurationMs) + 1;
  }

  getTotalRounds(): number {
    return this.totalRounds;
  }

  getTimeInCurrentPeriod(): number {
    const elapsed = this.getElapsedTime();
    return elapsed % this.periodDurationMs;
  }

  getRemainingInCurrentPeriod(): number {
    return this.periodDurationMs - this.getTimeInCurrentPeriod();
  }

  protected getPreviousRound(elapsed: number): number {
    return Math.floor(elapsed / this.periodDurationMs) + 1;
  }

  // Helper methods
  getPeriodDuration(): number {
    return this.periodDurationMs;
  }

  getRemainingTotal(): number {
    return this.getDuration() - this.getElapsedTime();
  }

  getProgress(): number {
    const elapsed = this.getElapsedTime();
    return Math.min(elapsed / this.getDuration(), 1);
  }

  getPeriodProgress(): number {
    const timeInPeriod = this.getTimeInCurrentPeriod();
    return Math.min(timeInPeriod / this.periodDurationMs, 1);
  }

  // Check if we're in the work phase (first 30s) or rest phase (remaining 60s)
  isInWorkPhase(): boolean {
    const timeInPeriod = this.getTimeInCurrentPeriod();
    return timeInPeriod < 30 * 1000; // First 30 seconds are work
  }

  getWorkPhaseRemaining(): number {
    if (!this.isInWorkPhase()) return 0;
    return 30 * 1000 - this.getTimeInCurrentPeriod();
  }

  getRestPhaseRemaining(): number {
    if (this.isInWorkPhase()) return 60 * 1000; // Full rest period ahead
    return this.getRemainingInCurrentPeriod();
  }

  getCurrentPhase(): 'work' | 'rest' {
    return this.isInWorkPhase() ? 'work' : 'rest';
  }

  // Factory method
  static create(rounds: number = 5): N90Timer {
    return new N90Timer(rounds);
  }
}