/**
 * App update manager for PWA
 * Handles service worker updates and notifies user when new version is available
 */
export class AppUpdater {
  private registration: ServiceWorkerRegistration | null = null;
  private showUpdateCallback: (() => void) | null = null;

  constructor() {
    // Wait for DOM to be ready before setting up service worker
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupUpdateDetection());
    } else {
      this.setupUpdateDetection();
    }
  }

  private async setupUpdateDetection() {
    if (!('serviceWorker' in navigator)) {
      console.log('Service workers not supported');
      return;
    }

    try {
      // Register service worker
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registered:', this.registration);

      // Check for updates immediately
      await this.checkForUpdates();
      
      // Check if there's already a waiting worker (happens on app restart)
      this.checkForWaitingWorker();
      
      // Double-check after a short delay to catch any race conditions
      setTimeout(() => {
        this.checkForWaitingWorker();
      }, 1000);

      // Also listen for when a waiting worker becomes available later
      if (this.registration.installing) {
        this.trackInstallingWorker(this.registration.installing);
      }

      // Check for updates every 60 seconds when app is active
      setInterval(() => {
        if (document.visibilityState === 'visible') {
          this.checkForUpdates();
        }
      }, 60000);

      // Listen for service worker updates
      this.registration.addEventListener('updatefound', () => {
        console.log('Update found, installing new version...');
        const newWorker = this.registration?.installing;
        
        if (newWorker) {
          this.trackInstallingWorker(newWorker);
        }
      });

      // Listen for service worker controlling the page
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('New service worker took control, reloading page');
        window.location.reload();
      });

    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  }

  private async checkForUpdates() {
    if (!this.registration) return;

    try {
      await this.registration.update();
    } catch (error) {
      console.error('Failed to check for updates:', error);
    }
  }

  private checkForWaitingWorker() {
    if (!this.registration) return;

    if (this.registration.waiting) {
      console.log('Found waiting service worker on startup');
      this.showUpdateAvailable();
    }
  }

  private trackInstallingWorker(worker: ServiceWorker) {
    worker.addEventListener('statechange', () => {
      console.log('Service worker state changed:', worker.state);
      if (worker.state === 'installed' && navigator.serviceWorker.controller) {
        // New version is ready
        console.log('New version ready');
        this.showUpdateAvailable();
      }
    });
  }

  private showUpdateAvailable() {
    if (this.showUpdateCallback) {
      this.showUpdateCallback();
    } else {
      // Default behavior if no callback is set
      this.showDefaultUpdateNotification();
    }
  }

  private showDefaultUpdateNotification() {
    if (confirm('A new version of Minimalift is available! Click OK to update now.')) {
      this.applyUpdate();
    }
  }

  /**
   * Set callback function to show custom update notification
   */
  onUpdateAvailable(callback: () => void) {
    this.showUpdateCallback = callback;
  }

  /**
   * Apply the pending update
   */
  async applyUpdate() {
    if (!this.registration?.waiting) {
      console.log('No update waiting');
      return;
    }

    // Tell the waiting service worker to skip waiting and become active
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }

  /**
   * Force check for updates
   */
  async forceUpdateCheck() {
    console.log('Forcing update check...');
    await this.checkForUpdates();
  }
}

export const appUpdater = new AppUpdater();