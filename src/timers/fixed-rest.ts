import { BaseTimer } from './timer-engine';

/**
 * Fixed Rest Timer - Simple countdown timer for rest periods
 */
export class FixedRestTimer extends BaseTimer {
  constructor(private readonly durationMs: number) {
    super(100); // 100ms tick interval
  }

  getDuration(): number {
    return this.durationMs;
  }

  getCurrentRound(): number {
    return 1; // Single round
  }

  getTotalRounds(): number {
    return 1;
  }

  getTimeInCurrentPeriod(): number {
    return this.getElapsedTime();
  }

  getRemainingInCurrentPeriod(): number {
    return this.durationMs - this.getElapsedTime();
  }

  protected getPreviousRound(): number {
    return 1;
  }

  // Helper methods
  getRemaining(): number {
    return Math.max(0, this.durationMs - this.getElapsedTime());
  }

  getProgress(): number {
    const elapsed = this.getElapsedTime();
    return Math.min(elapsed / this.durationMs, 1);
  }

  // Factory methods
  static create(seconds: number): FixedRestTimer {
    return new FixedRestTimer(seconds * 1000);
  }

  static createMinutes(minutes: number): FixedRestTimer {
    return new FixedRestTimer(minutes * 60 * 1000);
  }
}

/**
 * Timed Circuit Timer - Multiple exercises with set work/rest periods
 */
export class TimedCircuitTimer extends BaseTimer {
  constructor(
    private readonly workDurationMs: number,
    private readonly restDurationMs: number,
    private readonly totalRounds: number
  ) {
    super(100);
  }

  getDuration(): number {
    return (this.workDurationMs + this.restDurationMs) * this.totalRounds;
  }

  getCurrentRound(): number {
    const elapsed = this.getElapsedTime();
    const periodDuration = this.workDurationMs + this.restDurationMs;
    return Math.floor(elapsed / periodDuration) + 1;
  }

  getTotalRounds(): number {
    return this.totalRounds;
  }

  getTimeInCurrentPeriod(): number {
    const elapsed = this.getElapsedTime();
    const periodDuration = this.workDurationMs + this.restDurationMs;
    return elapsed % periodDuration;
  }

  getRemainingInCurrentPeriod(): number {
    const timeInPeriod = this.getTimeInCurrentPeriod();
    
    if (this.isInWorkPhase()) {
      return this.workDurationMs - timeInPeriod;
    } else {
      return (this.workDurationMs + this.restDurationMs) - timeInPeriod;
    }
  }

  protected getPreviousRound(elapsed: number): number {
    const periodDuration = this.workDurationMs + this.restDurationMs;
    return Math.floor(elapsed / periodDuration) + 1;
  }

  // Circuit-specific methods
  isInWorkPhase(): boolean {
    const timeInPeriod = this.getTimeInCurrentPeriod();
    return timeInPeriod < this.workDurationMs;
  }

  getCurrentPhase(): 'work' | 'rest' {
    return this.isInWorkPhase() ? 'work' : 'rest';
  }

  getWorkDuration(): number {
    return this.workDurationMs;
  }

  getRestDuration(): number {
    return this.restDurationMs;
  }

  getWorkPhaseRemaining(): number {
    if (!this.isInWorkPhase()) return 0;
    return this.workDurationMs - this.getTimeInCurrentPeriod();
  }

  getRestPhaseRemaining(): number {
    if (this.isInWorkPhase()) return this.restDurationMs;
    const timeInPeriod = this.getTimeInCurrentPeriod();
    return (this.workDurationMs + this.restDurationMs) - timeInPeriod;
  }

  getProgress(): number {
    const elapsed = this.getElapsedTime();
    return Math.min(elapsed / this.getDuration(), 1);
  }

  getPeriodProgress(): number {
    const timeInPeriod = this.getTimeInCurrentPeriod();
    const periodDuration = this.workDurationMs + this.restDurationMs;
    return Math.min(timeInPeriod / periodDuration, 1);
  }

  // Factory methods
  static create(workSeconds: number, restSeconds: number, rounds: number): TimedCircuitTimer {
    return new TimedCircuitTimer(workSeconds * 1000, restSeconds * 1000, rounds);
  }

  static createTabata(rounds: number = 8): TimedCircuitTimer {
    return new TimedCircuitTimer(20 * 1000, 10 * 1000, rounds); // 20s work, 10s rest
  }

  static createCustom(workMs: number, restMs: number, rounds: number): TimedCircuitTimer {
    return new TimedCircuitTimer(workMs, restMs, rounds);
  }
}