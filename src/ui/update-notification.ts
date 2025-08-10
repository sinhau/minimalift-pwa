import { appUpdater } from '../utils/app-updater';

export class UpdateNotification extends HTMLElement {

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
      this.show();
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transform: translateY(100%);
          transition: transform 0.3s ease-in-out;
          padding: env(safe-area-inset-bottom) 16px 16px 16px;
        }

        :host(.visible) {
          transform: translateY(0);
        }

        .notification {
          background: var(--accent, #007AFF);
          color: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .content {
          flex: 1;
        }

        .title {
          font-weight: 600;
          font-size: 16px;
          margin: 0 0 4px 0;
        }

        .message {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .update-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .update-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .dismiss-btn {
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dismiss-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --accent: #007AFF;
          }
        }

        @media (prefers-color-scheme: light) {
          :host {
            --accent: #007AFF;
          }
        }
      </style>

      <div class="notification">
        <div class="content">
          <div class="title">🚀 Update Available</div>
          <div class="message">A new version of Minimalift is ready to install.</div>
        </div>
        <div class="actions">
          <button class="dismiss-btn" id="dismiss">Later</button>
          <button class="update-btn" id="update">Update Now</button>
        </div>
      </div>
    `;
  }

  private setupEventListeners() {
    if (!this.shadowRoot) return;

    const updateBtn = this.shadowRoot.querySelector('#update');
    const dismissBtn = this.shadowRoot.querySelector('#dismiss');

    updateBtn?.addEventListener('click', () => {
      this.applyUpdate();
    });

    dismissBtn?.addEventListener('click', () => {
      this.hide();
    });
  }

  private show() {
    this.classList.add('visible');
  }

  private hide() {
    this.classList.remove('visible');
  }

  private async applyUpdate() {
    // Show loading state
    const updateBtn = this.shadowRoot?.querySelector('#update');
    if (updateBtn) {
      updateBtn.textContent = 'Updating...';
      (updateBtn as HTMLButtonElement).disabled = true;
    }

    // Apply the update
    await appUpdater.applyUpdate();
  }

  // Public method to manually trigger update check
  async checkForUpdates() {
    await appUpdater.forceUpdateCheck();
  }
}

customElements.define('update-notification', UpdateNotification);