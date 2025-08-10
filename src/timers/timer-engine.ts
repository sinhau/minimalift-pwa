export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerEvent {
  type: 'tick' | 'roundComplete' | 'complete' | 'stateChange';
  elapsed: number;
  remaining: number;
  round?: number;
  totalRounds?: number;
  state: TimerState;
}

export type TimerCallback = (event: TimerEvent) => void;

export abstract class BaseTimer {
  protected startTime: number = 0;
  protected pausedTime: number = 0;
  protected totalPausedDuration: number = 0;
  protected intervalId: number | null = null;
  protected state: TimerState = 'idle';
  protected callbacks: TimerCallback[] = [];

  constructor(protected readonly tickInterval: number = 100) {}

  abstract getDuration(): number;
  abstract getCurrentRound(): number;
  abstract getTotalRounds(): number;
  abstract getTimeInCurrentPeriod(): number;
  abstract getRemainingInCurrentPeriod(): number;

  start(): void {
    if (this.state === 'running') return;

    if (this.state === 'paused') {
      // Resume from pause
      this.totalPausedDuration += performance.now() - this.pausedTime;
    } else {
      // Fresh start
      this.startTime = performance.now();
      this.totalPausedDuration = 0;
    }

    this.state = 'running';
    this.intervalId = window.setInterval(() => this.tick(), this.tickInterval);
    this.notifyStateChange();
  }

  pause(): void {
    if (this.state !== 'running') return;

    this.state = 'paused';
    this.pausedTime = performance.now();
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.notifyStateChange();
  }

  reset(): void {
    this.stop();
    this.state = 'idle';
    this.startTime = 0;
    this.pausedTime = 0;
    this.totalPausedDuration = 0;
    this.notifyStateChange();
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getState(): TimerState {
    return this.state;
  }

  getElapsedTime(): number {
    if (this.startTime === 0) return 0;

    const now = this.state === 'paused' ? this.pausedTime : performance.now();
    return now - this.startTime - this.totalPausedDuration;
  }

  addCallback(callback: TimerCallback): void {
    this.callbacks.push(callback);
  }

  removeCallback(callback: TimerCallback): void {
    const index = this.callbacks.indexOf(callback);
    if (index > -1) {
      this.callbacks.splice(index, 1);
    }
  }

  protected tick(): void {
    const elapsed = this.getElapsedTime();
    const timeInPeriod = this.getTimeInCurrentPeriod();
    const remainingInPeriod = this.getRemainingInCurrentPeriod();
    const currentRound = this.getCurrentRound();
    const totalRounds = this.getTotalRounds();

    // Check if timer is complete
    if (elapsed >= this.getDuration()) {
      this.state = 'completed';
      this.stop();
      
      this.notifyCallbacks({
        type: 'complete',
        elapsed,
        remaining: 0,
        round: currentRound,
        totalRounds,
        state: this.state
      });
      return;
    }

    // Check for round completion (depends on timer type)
    const previousRound = this.getPreviousRound(elapsed - this.tickInterval);
    if (currentRound > previousRound && previousRound > 0) {
      this.notifyCallbacks({
        type: 'roundComplete',
        elapsed,
        remaining: remainingInPeriod,
        round: previousRound,
        totalRounds,
        state: this.state
      });
    }

    // Regular tick update
    this.notifyCallbacks({
      type: 'tick',
      elapsed,
      remaining: remainingInPeriod,
      round: currentRound,
      totalRounds,
      state: this.state
    });
  }

  protected abstract getPreviousRound(elapsed: number): number;

  protected notifyCallbacks(event: TimerEvent): void {
    this.callbacks.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Timer callback error:', error);
      }
    });
  }

  protected notifyStateChange(): void {
    const elapsed = this.getElapsedTime();
    this.notifyCallbacks({
      type: 'stateChange',
      elapsed,
      remaining: this.getRemainingInCurrentPeriod(),
      round: this.getCurrentRound(),
      totalRounds: this.getTotalRounds(),
      state: this.state
    });
  }

  // Utility methods for time formatting
  static formatTime(milliseconds: number): string {
    const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  static formatTimeWithMs(milliseconds: number): string {
    const totalMs = Math.max(0, milliseconds);
    const seconds = Math.floor(totalMs / 1000);
    const ms = Math.floor((totalMs % 1000) / 100);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${ms}`;
  }
}