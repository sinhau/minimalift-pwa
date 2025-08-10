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

      // Check for updates immediately on startup
      console.log('Checking for updates on startup...');
      await this.checkForUpdates();
      
      // Check if there's already a waiting worker (happens on app restart)
      console.log('Checking for waiting service worker...');
      this.checkForWaitingWorker();
      
      // Double-check after a short delay to catch any race conditions
      setTimeout(() => {
        console.log('Double-checking for waiting service worker after delay...');
        this.checkForWaitingWorker();
      }, 1000);

      // Also listen for when a waiting worker becomes available later
      if (this.registration.installing) {
        this.trackInstallingWorker(this.registration.installing);
      }

      // Check for updates every 30 seconds when app is active
      setInterval(() => {
        if (document.visibilityState === 'visible') {
          console.log('Periodic update check (30s interval)');
          this.checkForUpdates();
        }
      }, 30000);

      // Check for updates when app comes to foreground
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          console.log('App came to foreground, checking for updates');
          this.checkForUpdates();
        }
      });

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
    if (!this.registration) {
      console.log('No registration available for update check');
      return;
    }

    try {
      console.log('Calling registration.update()...');
      await this.registration.update();
      console.log('Update check completed');
      
      // After update check, also check if there's a waiting worker
      if (this.registration.waiting) {
        console.log('Found waiting worker after update check');
        this.showUpdateAvailable();
      }
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
   * Force check for updates (public method for manual triggering)
   */
  async forceUpdateCheck() {
    console.log('Manual update check triggered...');
    await this.checkForUpdates();
    
    // Give some time for the update process to complete
    setTimeout(() => {
      this.checkForWaitingWorker();
    }, 2000);
  }
}

export const appUpdater = new AppUpdater();