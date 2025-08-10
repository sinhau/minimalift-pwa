import { BaseTimer } from './timer-engine';

export interface Station {
  name: string;
  durationSec: number;
}

export class CircuitTimer extends BaseTimer {
  private currentRound: number = 1;
  private currentStationIndex: number = 0;
  
  constructor(
    private stations: Station[],
    private totalRounds: number,
    private transitionSec: number = 0
  ) {
    super();
  }

  getDuration(): number {
    const stationTime = this.stations.reduce((sum, s) => sum + s.durationSec, 0);
    const transitionTime = this.transitionSec * Math.max(0, this.stations.length - 1);
    return (stationTime + transitionTime) * this.totalRounds * 1000;
  }

  getCurrentRound(): number {
    return this.currentRound;
  }

  getTotalRounds(): number {
    return this.totalRounds;
  }

  getCurrentStation(): Station | null {
    if (this.currentStationIndex < this.stations.length) {
      return this.stations[this.currentStationIndex];
    }
    return null;
  }

  getCurrentStationIndex(): number {
    return this.currentStationIndex;
  }

  getTimeInCurrentPeriod(): number {
    const elapsed = this.getElapsedTime();
    const roundDuration = this.getRoundDuration();
    const timeInRound = elapsed % roundDuration;
    
    let accumulated = 0;
    for (let i = 0; i < this.stations.length; i++) {
      const stationDuration = this.stations[i].durationSec * 1000;
      if (timeInRound < accumulated + stationDuration) {
        return timeInRound - accumulated;
      }
      accumulated += stationDuration;
      
      if (i < this.stations.length - 1) {
        const transitionDuration = this.transitionSec * 1000;
        if (timeInRound < accumulated + transitionDuration) {
          return timeInRound - accumulated;
        }
        accumulated += transitionDuration;
      }
    }
    
    return 0;
  }

  getRemainingInCurrentPeriod(): number {
    const station = this.getCurrentStation();
    if (!station) return 0;
    
    const isTransition = this.isInTransition();
    const periodDuration = isTransition ? this.transitionSec * 1000 : station.durationSec * 1000;
    return periodDuration - this.getTimeInCurrentPeriod();
  }

  isInTransition(): boolean {
    const elapsed = this.getElapsedTime();
    const roundDuration = this.getRoundDuration();
    const timeInRound = elapsed % roundDuration;
    
    let accumulated = 0;
    for (let i = 0; i < this.stations.length; i++) {
      accumulated += this.stations[i].durationSec * 1000;
      if (timeInRound < accumulated) {
        return false;
      }
      
      if (i < this.stations.length - 1) {
        accumulated += this.transitionSec * 1000;
        if (timeInRound < accumulated) {
          return true;
        }
      }
    }
    
    return false;
  }

  private getRoundDuration(): number {
    const stationTime = this.stations.reduce((sum, s) => sum + s.durationSec * 1000, 0);
    const transitionTime = this.transitionSec * Math.max(0, this.stations.length - 1) * 1000;
    return stationTime + transitionTime;
  }

  private updateCurrentPosition(): void {
    const elapsed = this.getElapsedTime();
    const roundDuration = this.getRoundDuration();
    
    this.currentRound = Math.min(Math.floor(elapsed / roundDuration) + 1, this.totalRounds);
    const timeInRound = elapsed % roundDuration;
    
    let accumulated = 0;
    for (let i = 0; i < this.stations.length; i++) {
      accumulated += this.stations[i].durationSec * 1000;
      if (timeInRound < accumulated) {
        this.currentStationIndex = i;
        return;
      }
      
      if (i < this.stations.length - 1) {
        accumulated += this.transitionSec * 1000;
        if (timeInRound < accumulated) {
          this.currentStationIndex = i;
          return;
        }
      }
    }
    
    this.currentStationIndex = this.stations.length - 1;
  }

  protected getPreviousRound(elapsed: number): number {
    const roundDuration = this.getRoundDuration();
    return Math.min(Math.floor(elapsed / roundDuration) + 1, this.totalRounds);
  }

  protected tick(): void {
    const elapsed = this.getElapsedTime();
    const remaining = this.getDuration() - elapsed;
    
    if (remaining <= 0) {
      this.state = 'completed'; this.stop();
      return;
    }

    const prevRound = this.currentRound;
    // const prevStation = this.currentStationIndex;
    this.updateCurrentPosition();

    if (this.currentRound > prevRound) {
      this.notifyCallbacks({
        type: 'roundComplete',
        elapsed,
        remaining,
        round: prevRound,
        totalRounds: this.totalRounds,
        state: this.state
      });
    }

    this.notifyCallbacks({
      type: 'tick',
      elapsed,
      remaining,
      round: this.currentRound,
      totalRounds: this.totalRounds,
      state: this.state
    });
  }
}