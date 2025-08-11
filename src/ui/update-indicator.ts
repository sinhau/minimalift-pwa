import { appUpdater } from '../utils/app-updater';

export class UpdateIndicator extends HTMLElement {
  private isUpdateAvailable = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.setupUpdateListener();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  private setupUpdateListener() {
    appUpdater.onUpdateAvailable(() => {
      this.isUpdateAvailable = true;
      this.show();
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: relative;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        :host(.visible) {
          display: flex;
        }

        .indicator {
          position: relative;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: var(--accent, #007AFF);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: var(--accent, #007AFF);
          animation: bounce 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .tooltip {
          position: absolute;
          bottom: -36px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 1000;
        }

        .tooltip::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid rgba(0, 0, 0, 0.9);
        }

        :host(:hover) .tooltip {
          opacity: 1;
        }

        /* Loading state */
        :host(.updating) .indicator {
          animation: rotate 1s linear infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      </style>

      <div class="indicator" aria-label="Update available">
        <!-- Using download arrow icon -->
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        <div class="tooltip">Update available - click to install</div>
      </div>
    `;
  }

  private setupEventListeners() {
    if (!this.shadowRoot) return;

    this.addEventListener('click', () => {
      if (this.isUpdateAvailable) {
        this.applyUpdate();
      }
    });
  }

  private show() {
    this.classList.add('visible');
  }


  private async applyUpdate() {
    // Show loading state
    this.classList.add('updating');
    
    const indicator = this.shadowRoot?.querySelector('.indicator');
    if (indicator) {
      indicator.innerHTML = `
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
        </svg>
        <div class="tooltip">Updating...</div>
      `;
    }

    // Apply the update
    await appUpdater.applyUpdate();
  }
}

customElements.define('update-indicator', UpdateIndicator);