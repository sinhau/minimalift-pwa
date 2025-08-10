import { BaseTimer } from './timer-engine';

export class WorkRestTimer extends BaseTimer {
  private currentSet: number = 1;
  private isWorkPhase: boolean = true;
  
  constructor(
    private workSec: number,
    private restSec: number,
    private totalSets: number
  ) {
    super();
  }

  getDuration(): number {
    return (this.workSec + this.restSec) * this.totalSets * 1000;
  }

  getCurrentRound(): number {
    return this.currentSet;
  }

  getTotalRounds(): number {
    return this.totalSets;
  }

  getTimeInCurrentPeriod(): number {
    const elapsed = this.getElapsedTime();
    const periodDuration = (this.workSec + this.restSec) * 1000;
    const timeInSet = elapsed % periodDuration;
    
    if (timeInSet < this.workSec * 1000) {
      return timeInSet;
    } else {
      return timeInSet - (this.workSec * 1000);
    }
  }

  getRemainingInCurrentPeriod(): number {
    const elapsed = this.getElapsedTime();
    const periodDuration = (this.workSec + this.restSec) * 1000;
    const timeInSet = elapsed % periodDuration;
    
    if (timeInSet < this.workSec * 1000) {
      return (this.workSec * 1000) - timeInSet;
    } else {
      return (this.restSec * 1000) - (timeInSet - this.workSec * 1000);
    }
  }

  isInWorkPhase(): boolean {
    const elapsed = this.getElapsedTime();
    const periodDuration = (this.workSec + this.restSec) * 1000;
    const timeInSet = elapsed % periodDuration;
    return timeInSet < this.workSec * 1000;
  }

  protected getPreviousRound(elapsed: number): number {
    return Math.min(Math.floor(elapsed / ((this.workSec + this.restSec) * 1000)) + 1, this.totalSets);
  }

  protected tick(): void {
    const elapsed = this.getElapsedTime();
    const remaining = this.getDuration() - elapsed;
    const currentSet = Math.min(Math.floor(elapsed / ((this.workSec + this.restSec) * 1000)) + 1, this.totalSets);
    const wasWorkPhase = this.isWorkPhase;
    this.isWorkPhase = this.isInWorkPhase();

    if (remaining <= 0) {
      this.state = 'completed'; this.stop();
      return;
    }

    if (currentSet > this.currentSet) {
      this.currentSet = currentSet;
      this.notifyCallbacks({
        type: 'roundComplete',
        elapsed,
        remaining,
        round: currentSet - 1,
        totalRounds: this.totalSets,
        state: this.state
      });
    } else if (wasWorkPhase && !this.isWorkPhase) {
      // Transitioned from work to rest
      this.notifyCallbacks({
        type: 'tick',
        elapsed,
        remaining,
        round: currentSet,
        totalRounds: this.totalSets,
        state: this.state
      });
    }

    this.notifyCallbacks({
      type: 'tick',
      elapsed,
      remaining,
      round: currentSet,
      totalRounds: this.totalSets,
      state: this.state
    });
  }
}