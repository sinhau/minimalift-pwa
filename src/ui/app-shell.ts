export class AppShell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  private render() {
    if (!this.shadowRoot) return;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100vh;
          height: 100dvh;
          background: var(--bg-primary);
          color: var(--text-primary);
          position: relative;
        }

        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          padding: env(safe-area-inset-top) 16px 0 16px;
          border-bottom: 1px solid var(--border);
          z-index: 10;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .day-selector {
          display: flex;
          gap: 8px;
        }

        .day-btn {
          padding: 6px 12px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .day-btn.active {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .settings-btn {
          padding: 6px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .settings-btn:hover {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        main {
          position: absolute;
          top: calc(env(safe-area-inset-top) + 65px); /* Safe area + header content */
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0;
          background: var(--bg-primary);
        }

        .timer-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding: 12px 16px;
          padding-bottom: calc(12px + env(safe-area-inset-bottom));
          display: none;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .timer-bar.active {
          display: block;
        }

        .timer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .timer-display {
          font-size: 24px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        .timer-controls {
          display: flex;
          gap: 8px;
        }

        .timer-btn {
          padding: 8px 16px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .timer-btn.pause {
          background: var(--warning);
        }

        .timer-round {
          font-size: 14px;
          color: var(--text-secondary);
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --bg-primary: #000000;
            --bg-secondary: #1a1a1a;
            --text-primary: #ffffff;
            --text-secondary: #999999;
            --border: #333333;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }

        @media (prefers-color-scheme: light) {
          :host {
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
            --text-primary: #000000;
            --text-secondary: #666666;
            --border: #e0e0e0;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }
      </style>

      <header>
        <div class="header-content">
          <div class="logo">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="6" fill="#000000"/>
              <text x="16" y="16" font-family="-apple-system, system-ui, sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">M</text>
            </svg>
          </div>
          <div class="day-selector">
            <button class="day-btn active" data-day="1">Day 1</button>
            <button class="day-btn" data-day="2">Day 2</button>
            <button class="day-btn" data-day="3">Day 3</button>
          </div>
          <button class="settings-btn" aria-label="Settings">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM10 3a7 7 0 100 14 7 7 0 000-14z"/>
            </svg>
          </button>
        </div>
      </header>

      <main id="content">
      </main>

      <update-notification></update-notification>

      <div class="timer-bar" id="timer-bar">
        <div class="timer-content">
          <div>
            <div class="timer-display" id="timer-display">00:00</div>
            <div class="timer-round" id="timer-round">Round 1/6</div>
          </div>
          <div class="timer-controls">
            <button class="timer-btn" id="timer-toggle">Start</button>
            <button class="timer-btn pause" id="timer-reset">Reset</button>
          </div>
        </div>
      </div>
    `;
  }

  private setupEventListeners() {
    if (!this.shadowRoot) return;

    // Day selector
    this.shadowRoot.querySelectorAll('.day-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const day = target.dataset.day;
        if (day) {
          this.selectDay(day);
        }
      });
    });

    // Settings button
    const settingsBtn = this.shadowRoot.querySelector('.settings-btn');
    settingsBtn?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('open-settings'));
    });
  }

  private selectDay(day: string) {
    if (!this.shadowRoot) return;
    
    this.shadowRoot.querySelectorAll('.day-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    const selectedBtn = this.shadowRoot.querySelector(`.day-btn[data-day="${day}"]`);
    selectedBtn?.classList.add('active');
    
    this.dispatchEvent(new CustomEvent('day-selected', { detail: { day } }));
  }

  showTimer(display: string, round: string) {
    if (!this.shadowRoot) return;
    
    const timerBar = this.shadowRoot.querySelector('#timer-bar');
    const timerDisplay = this.shadowRoot.querySelector('#timer-display');
    const timerRound = this.shadowRoot.querySelector('#timer-round');
    
    if (timerBar) timerBar.classList.add('active');
    if (timerDisplay) timerDisplay.textContent = display;
    if (timerRound) timerRound.textContent = round;
  }

  hideTimer() {
    if (!this.shadowRoot) return;
    
    const timerBar = this.shadowRoot.querySelector('#timer-bar');
    if (timerBar) timerBar.classList.remove('active');
  }
}

customElements.define('app-shell', AppShell);