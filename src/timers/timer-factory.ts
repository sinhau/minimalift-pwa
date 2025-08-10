import { TimerType, TimerConfig } from '../types';
import { BaseTimer } from './timer-engine';
import { IntervalTimer } from './interval';
import { WorkRestTimer } from './work-rest';
import { CircuitTimer } from './circuit';
import { TabataTimer } from './tabata';
import { StopwatchTimer } from './stopwatch';

export class TimerFactory {
  static createTimer(type: TimerType, config?: TimerConfig): BaseTimer | null {
    if (!config && type !== 'stopwatch') return null;

    switch (type) {
      case 'interval':
        if (config?.intervalSec && config?.rounds) {
          return new IntervalTimer(
            config.intervalSec,
            config.rounds,
            config.exercisesPerInterval || 1
          );
        }
        break;

      case 'work_rest':
        if (config?.workSec && config?.restSec && config?.rounds) {
          return new WorkRestTimer(
            config.workSec,
            config.restSec,
            config.rounds
          );
        } else if (config?.restSec && config?.rounds) {
          // Simple rest timer (work phase is 0)
          return new WorkRestTimer(
            0,
            config.restSec,
            config.rounds
          );
        }
        break;

      case 'circuit':
        if (config?.stations && config.stations.length > 0 && config?.rounds) {
          return new CircuitTimer(
            config.stations,
            config.rounds,
            config.transitionSec || 0
          );
        }
        break;

      case 'tabata':
        if (config?.highIntensitySec && config?.lowIntensitySec && config?.rounds) {
          return new TabataTimer(
            config.highIntensitySec,
            config.lowIntensitySec,
            config.rounds
          );
        }
        break;

      case 'stopwatch':
        return new StopwatchTimer();

      case 'none':
      default:
        return null;
    }

    return null;
  }

  // Convenience method for creating rest timer between sets
  static createRestTimer(restSeconds: number, sets: number = 1): WorkRestTimer {
    return new WorkRestTimer(0, restSeconds, sets);
  }
}