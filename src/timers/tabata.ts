import { BaseTimer } from './timer-engine';

export class TabataTimer extends BaseTimer {
  private currentRound: number = 1;
  
  constructor(
    private highIntensitySec: number,
    private lowIntensitySec: number,
    private totalRounds: number
  ) {
    super();
  }

  getDuration(): number {
    return (this.highIntensitySec + this.lowIntensitySec) * this.totalRounds * 1000;
  }

  getCurrentRound(): number {
    const elapsed = this.getElapsedTime();
    const periodDuration = (this.highIntensitySec + this.lowIntensitySec) * 1000;
    return Math.min(Math.floor(elapsed / periodDuration) + 1, this.totalRounds);
  }

  getTotalRounds(): number {
    return this.totalRounds;
  }

  getTimeInCurrentPeriod(): number {
    const elapsed = this.getElapsedTime();
    const periodDuration = (this.highIntensitySec + this.lowIntensitySec) * 1000;
    const timeInRound = elapsed % periodDuration;
    
    if (timeInRound < this.highIntensitySec * 1000) {
      return timeInRound;
    } else {
      return timeInRound - (this.highIntensitySec * 1000);
    }
  }

  getRemainingInCurrentPeriod(): number {
    const elapsed = this.getElapsedTime();
    const periodDuration = (this.highIntensitySec + this.lowIntensitySec) * 1000;
    const timeInRound = elapsed % periodDuration;
    
    if (timeInRound < this.highIntensitySec * 1000) {
      return (this.highIntensitySec * 1000) - timeInRound;
    } else {
      return (this.lowIntensitySec * 1000) - (timeInRound - this.highIntensitySec * 1000);
    }
  }

  isHighIntensity(): boolean {
    const elapsed = this.getElapsedTime();
    const periodDuration = (this.highIntensitySec + this.lowIntensitySec) * 1000;
    const timeInRound = elapsed % periodDuration;
    return timeInRound < this.highIntensitySec * 1000;
  }

  protected getPreviousRound(elapsed: number): number {
    const periodDuration = (this.highIntensitySec + this.lowIntensitySec) * 1000;
    return Math.min(Math.floor(elapsed / periodDuration) + 1, this.totalRounds);
  }

  protected tick(): void {
    const elapsed = this.getElapsedTime();
    const remaining = this.getDuration() - elapsed;
    const currentRound = this.getCurrentRound();

    if (remaining <= 0) {
      this.state = 'completed'; this.stop();
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