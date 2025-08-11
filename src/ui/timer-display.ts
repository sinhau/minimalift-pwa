import { BaseComponent } from './base-component';
import { TimerEvent } from '../timers/timer-engine';

/**
 * Timer display component that shows countdown, progress, and phase information.
 * This is a pure display component - it doesn't control the timer, just shows its state.
 */
export class TimerDisplay extends BaseComponent {
  private latestEvent: TimerEvent | null = null;

  protected render(): void {
    this.setHTML(`
      <style>
        :host {
          display: block;
        }

        .timer-container {
          padding: 20px;
          text-align: center;
        }

        .timer-display {
          font-size: 48px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          margin: 10px 0;
        }

        .timer-display.warning {
          color: var(--warning, #FF9500);
        }

        .timer-phase {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .timer-progress {
          width: 100%;
          height: 4px;
          background: var(--bg-secondary);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 16px;
        }

        .timer-progress-bar {
          height: 100%;
          background: var(--accent, #007AFF);
          transition: width 0.1s linear;
        }

        .timer-info {
          margin-top: 12px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .timer-round {
          font-weight: 600;
        }

        /* Hide when no timer */
        :host(:empty) .timer-container {
          display: none;
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --bg-secondary: #1a1a1a;
            --text-secondary: #999999;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }

        @media (prefers-color-scheme: light) {
          :host {
            --bg-secondary: #f5f5f5;
            --text-secondary: #666666;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }
      </style>

      <div class="timer-container">
        <div class="timer-phase"></div>
        <div class="timer-display">--:--</div>
        <div class="timer-progress">
          <div class="timer-progress-bar" style="width: 0%"></div>
        </div>
        <div class="timer-info"></div>
      </div>
    `);
  }

  /**
   * Clear the timer display
   */
  clear(): void {
    this.latestEvent = null;
    this.updateDisplay();
  }

  /**
   * Update the display with a timer event
   */
  updateFromEvent(event: TimerEvent): void {
    this.latestEvent = event;
    this.updateDisplay();
  }

  /**
   * Update the timer display with current values
   */
  private updateDisplay(): void {
    const display = this.$('.timer-display') as HTMLElement;
    const progressBar = this.$('.timer-progress-bar') as HTMLElement;
    const infoEl = this.$('.timer-info') as HTMLElement;

    if (!display || !this.latestEvent) {
      if (display) {
        display.textContent = '--:--';
      }
      return;
    }

    const event = this.latestEvent;
    
    // Update time display
    display.textContent = this.formatTime(event.remaining);
    
    // Add warning class for last 3 seconds
    display.classList.toggle('warning', event.remaining <= 3000);
    
    // Update progress bar (simplified for now)
    const progress = this.calculateProgress();
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Update round info
    const info = this.getRoundInfo();
    if (infoEl && info) {
      infoEl.innerHTML = info;
    }
  }

  /**
   * Format milliseconds to MM:SS or M:SS
   */
  private formatTime(ms: number): string {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return `0:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Calculate progress percentage (simplified)
   */
  private calculateProgress(): number {
    if (!this.latestEvent) return 0;
    
    // Simple progress based on elapsed vs total
    // This is a simplified version - can be enhanced later
    const total = this.latestEvent.elapsed + this.latestEvent.remaining;
    if (total <= 0) return 0;
    
    return (this.latestEvent.elapsed / total) * 100;
  }

  /**
   * Get round information text
   */
  private getRoundInfo(): string {
    if (!this.latestEvent) return '';

    // Show round info if available
    if (this.latestEvent.round !== undefined && this.latestEvent.totalRounds) {
      return `<span class="timer-round">Round ${this.latestEvent.round + 1} of ${this.latestEvent.totalRounds}</span>`;
    }

    return '';
  }
}

customElements.define('timer-display', TimerDisplay);