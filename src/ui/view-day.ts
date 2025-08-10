import { Day, Block, Exercise } from '../types';
import { programManager } from '../program';

export class ViewDay extends HTMLElement {
  private day: Day | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async loadDay(dayId: string) {
    this.day = await programManager.getDay(dayId) || null;
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    if (!this.day) {
      this.shadowRoot.innerHTML = '<p>Loading...</p>';
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 16px;
          padding-bottom: 120px; /* Extra space for fixed button */
          height: auto;
          overflow: visible;
        }

        h2 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 24px 0;
          color: var(--text-primary);
        }

        .block {
          margin-bottom: 32px;
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 16px;
        }

        .block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .block-title {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
        }

        .timer-badge {
          background: var(--accent);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .exercise {
          background: var(--bg-primary);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 8px;
        }

        .exercise:last-child {
          margin-bottom: 0;
        }

        .exercise-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .exercise-name {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .exercise-sets-reps {
          font-size: 14px;
          color: var(--accent);
          font-weight: 500;
        }

        .exercise-cues {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-top: 4px;
        }

        .substitutes {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .substitute-chip {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          border: 1px solid var(--border);
          cursor: pointer;
        }

        .substitute-chip:hover {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .block-notes {
          background: var(--bg-primary);
          border-radius: 8px;
          padding: 12px;
          margin-top: 12px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .start-session-btn {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
          z-index: 100;
        }

        :host {
          --bg-primary: #000000;
          --bg-secondary: #1a1a1a;
          --text-primary: #ffffff;
          --text-secondary: #999999;
          --border: #333333;
          --accent: #007AFF;
        }

        @media (prefers-color-scheme: light) {
          :host {
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
            --text-primary: #000000;
            --text-secondary: #666666;
            --border: #e0e0e0;
            --accent: #007AFF;
          }
        }
      </style>

      <h2>${this.day.title}</h2>
      
      ${this.day.blocks.map(block => this.renderBlock(block)).join('')}
      
      <button class="start-session-btn" data-day-id="${this.day.dayId}">
        Start Session
      </button>
    `;

    // Add event listeners
    this.shadowRoot.querySelector('.start-session-btn')?.addEventListener('click', (e) => {
      const btn = e.target as HTMLButtonElement;
      const dayId = btn.dataset.dayId;
      if (dayId) {
        this.dispatchEvent(new CustomEvent('start-session', { 
          detail: { dayId },
          bubbles: true,
          composed: true
        }));
      }
    });

    // Add substitute click handlers
    this.shadowRoot.querySelectorAll('.substitute-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const el = e.target as HTMLElement;
        const exerciseId = el.dataset.exerciseId;
        const substitute = el.dataset.substitute;
        if (exerciseId && substitute) {
          console.log('Switch to substitute:', substitute, 'for exercise:', exerciseId);
          // TODO: Implement substitute switching
        }
      });
    });
  }

  private renderBlock(block: Block): string {
    const timerLabel = this.getTimerLabel(block.timerMode);
    
    return `
      <div class="block">
        <div class="block-header">
          <span class="block-title">${this.getBlockTitle(block.type)}</span>
          ${timerLabel ? `<span class="timer-badge">${timerLabel}</span>` : ''}
        </div>
        
        ${block.exercises.map(exercise => this.renderExercise(exercise)).join('')}
        
        ${block.notes ? `<div class="block-notes">${block.notes}</div>` : ''}
      </div>
    `;
  }

  private renderExercise(exercise: Exercise): string {
    const setsReps = exercise.sets ? `${exercise.sets} × ${exercise.reps}` : exercise.reps;
    
    return `
      <div class="exercise">
        <div class="exercise-header">
          <span class="exercise-name">${exercise.name}</span>
          <span class="exercise-sets-reps">${setsReps}</span>
        </div>
        
        ${exercise.cues ? `<div class="exercise-cues">${exercise.cues}</div>` : ''}
        
        ${exercise.substitutes && exercise.substitutes.length > 0 ? `
          <div class="substitutes">
            ${exercise.substitutes.map(sub => `
              <span class="substitute-chip" 
                    data-exercise-id="${exercise.id}" 
                    data-substitute="${sub}">
                ${sub}
              </span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  private getBlockTitle(type: string): string {
    const titles: Record<string, string> = {
      warmup: 'Warm Up',
      strength: 'Strength & Condition',
      swole: 'Swole & Flexy',
      accessory: 'Accessories'
    };
    return titles[type] || type;
  }

  private getTimerLabel(timerMode: string): string {
    const labels: Record<string, string> = {
      emom: 'EMOM',
      e2mom: 'E2MOM',
      e4mom: 'E4MOM',
      n90: 'N90',
      fixed_rest: 'Rest Timer',
      timed_circuit: 'Circuit'
    };
    return labels[timerMode] || '';
  }
}

customElements.define('view-day', ViewDay);