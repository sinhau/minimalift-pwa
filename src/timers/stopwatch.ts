import { BaseTimer } from './timer-engine';

export class StopwatchTimer extends BaseTimer {
  private laps: number[] = [];
  
  constructor() {
    super();
  }

  getDuration(): number {
    // Stopwatch has no fixed duration
    return Number.MAX_SAFE_INTEGER;
  }

  getCurrentRound(): number {
    return this.laps.length + 1;
  }

  getTotalRounds(): number {
    // No fixed number of rounds for stopwatch
    return 0;
  }

  getTimeInCurrentPeriod(): number {
    const elapsed = this.getElapsedTime();
    const lastLapTime = this.laps.length > 0 ? this.laps[this.laps.length - 1] : 0;
    return elapsed - lastLapTime;
  }

  getRemainingInCurrentPeriod(): number {
    // Stopwatch doesn't have a remaining time
    return 0;
  }

  addLap(): void {
    const elapsed = this.getElapsedTime();
    this.laps.push(elapsed);
    
    this.notifyCallbacks({
      type: 'roundComplete',
      elapsed,
      remaining: 0,
      round: this.laps.length,
      totalRounds: 0,
      state: this.state
    });
  }

  getLaps(): number[] {
    return [...this.laps];
  }

  getLapTime(index: number): number {
    if (index < 0 || index >= this.laps.length) return 0;
    
    const lapTime = this.laps[index];
    const previousLapTime = index > 0 ? this.laps[index - 1] : 0;
    return lapTime - previousLapTime;
  }

  reset(): void {
    super.reset();
    this.laps = [];
  }

  protected getPreviousRound(_elapsed: number): number {
    // Stopwatch doesn't have traditional rounds
    return this.laps.length;
  }

  protected tick(): void {
    const elapsed = this.getElapsedTime();
    
    this.notifyCallbacks({
      type: 'tick',
      elapsed,
      remaining: 0,
      round: this.laps.length + 1,
      totalRounds: 0,
      state: this.state
    });
  }
}