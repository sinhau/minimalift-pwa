import { BaseTimer } from './timer-engine';

/**
 * EMOM Timer - Every Minute on the Minute
 * Also supports E2MOM (Every 2 Minutes) and E4MOM (Every 4 Minutes)
 */
export class EMOMTimer extends BaseTimer {
  constructor(
    private readonly periodDurationMs: number,
    private readonly totalRounds: number
  ) {
    super(100); // 100ms tick interval for smooth updates
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

  // Helper methods for getting period info
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

  // Convenience factory methods
  static createEMOM(rounds: number): EMOMTimer {
    return new EMOMTimer(60 * 1000, rounds); // 60 seconds
  }

  static createE2MOM(rounds: number): EMOMTimer {
    return new EMOMTimer(2 * 60 * 1000, rounds); // 120 seconds
  }

  static createE4MOM(rounds: number): EMOMTimer {
    return new EMOMTimer(4 * 60 * 1000, rounds); // 240 seconds
  }

  static createCustom(periodSeconds: number, rounds: number): EMOMTimer {
    return new EMOMTimer(periodSeconds * 1000, rounds);
  }
}