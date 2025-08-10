import { Day } from '../types';
import { programManager } from '../program';

export class ViewHome extends HTMLElement {
  private days: Day[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    this.days = await programManager.getAllDays();
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 16px;
        }

        h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: var(--text-primary);
        }

        .subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .day-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .day-card {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }

        .day-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .day-number {
          display: inline-block;
          width: 32px;
          height: 32px;
          background: var(--accent);
          color: white;
          border-radius: 8px;
          text-align: center;
          line-height: 32px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .day-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .day-summary {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .day-blocks {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .block-badge {
          background: var(--bg-primary);
          color: var(--text-secondary);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
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

      <h1>Minimalift</h1>
      <div class="subtitle">3-Day Full Body Program</div>
      
      <div class="day-cards">
        ${this.days.map(day => this.renderDayCard(day)).join('')}
      </div>
    `;

    // Add click handlers
    this.shadowRoot.querySelectorAll('.day-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const dayId = (e.currentTarget as HTMLElement).dataset.dayId;
        if (dayId) {
          this.dispatchEvent(new CustomEvent('navigate-to-day', {
            detail: { dayId },
            bubbles: true,
            composed: true
          }));
        }
      });
    });
  }

  private renderDayCard(day: Day): string {
    const blockTypes = [...new Set(day.blocks.map(b => b.type))];
    const exerciseCount = day.blocks.reduce((sum, block) => sum + block.exercises.length, 0);

    return `
      <div class="day-card" data-day-id="${day.dayId}">
        <div class="day-number">${day.order}</div>
        <div class="day-title">${day.title}</div>
        <div class="day-summary">${exerciseCount} exercises • ${day.blocks.length} blocks</div>
        
        <div class="day-blocks">
          ${blockTypes.map(type => `<span class="block-badge">${type}</span>`).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('view-home', ViewHome);