import { BaseTimer } from './timer-engine';

export class IntervalTimer extends BaseTimer {
  private currentRound: number = 1;
  
  constructor(
    private intervalSec: number,
    private totalRounds: number,
    private exercisesPerInterval: number = 1
  ) {
    super();
  }

  getDuration(): number {
    return this.intervalSec * this.totalRounds * 1000;
  }

  getCurrentRound(): number {
    const elapsed = this.getElapsedTime();
    return Math.min(Math.floor(elapsed / (this.intervalSec * 1000)) + 1, this.totalRounds);
  }

  getTotalRounds(): number {
    return this.totalRounds;
  }

  getTimeInCurrentPeriod(): number {
    const elapsed = this.getElapsedTime();
    return elapsed % (this.intervalSec * 1000);
  }

  getRemainingInCurrentPeriod(): number {
    return (this.intervalSec * 1000) - this.getTimeInCurrentPeriod();
  }

  getExercisesPerInterval(): number {
    return this.exercisesPerInterval;
  }

  protected getPreviousRound(elapsed: number): number {
    return Math.min(Math.floor(elapsed / (this.intervalSec * 1000)) + 1, this.totalRounds);
  }

  protected tick(): void {
    const elapsed = this.getElapsedTime();
    const remaining = this.getDuration() - elapsed;
    const currentRound = this.getCurrentRound();

    if (remaining <= 0) {
      this.state = 'completed';
      this.stop();
      this.notifyCallbacks({
        type: 'complete',
        elapsed,
        remaining,
        round: currentRound,
        totalRounds: this.totalRounds,
        state: this.state
      });
      return;
    }

    if (currentRound > this.currentRound) {
      this.currentRound = currentRound;
      this.notifyCallbacks({
        type: 'roundComplete',
        elapsed,
        remaining,
        round: currentRound - 1,
        totalRounds: this.totalRounds,
        state: this.state
      });
    }

    this.notifyCallbacks({
      type: 'tick',
      elapsed,
      remaining,
      round: currentRound,
      totalRounds: this.totalRounds,
      state: this.state
    });
  }
}