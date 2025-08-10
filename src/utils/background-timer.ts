/**
 * Background timer management to handle app going background/foreground
 */
export class BackgroundTimerManager {
  private backgroundStartTime: number | null = null;
  private callbacks: (() => void)[] = [];

  constructor() {
    this.setupVisibilityHandlers();
  }

  private setupVisibilityHandlers() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handleBackground();
      } else {
        this.handleForeground();
      }
    });

    // Also handle page focus/blur for better coverage
    window.addEventListener('blur', () => {
      if (!document.hidden) {
        this.handleBackground();
      }
    });

    window.addEventListener('focus', () => {
      if (!document.hidden) {
        this.handleForeground();
      }
    });
  }

  private handleBackground() {
    console.log('App went to background');
    this.backgroundStartTime = performance.now();
    
    // Show a notification if permissions are granted and we have an active timer
    this.maybeShowNotification();
  }

  private handleForeground() {
    if (this.backgroundStartTime !== null) {
      const timeInBackground = performance.now() - this.backgroundStartTime;
      console.log(`App returned to foreground after ${timeInBackground}ms`);
      
      this.backgroundStartTime = null;
      
      // Notify callbacks that we're back in foreground
      this.callbacks.forEach(callback => {
        try {
          callback();
        } catch (error) {
          console.error('Background timer callback error:', error);
        }
      });
    }
  }

  private async maybeShowNotification() {
    // Check if we have notification permission
    if ('Notification' in window && Notification.permission === 'granted') {
      // Only show if we have an active workout session
      const isSessionActive = this.callbacks.length > 0;
      
      if (isSessionActive) {
        try {
          const notification = new Notification('Minimalift Workout Active', {
            body: 'Your workout timer is still running in the background.',
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-192x192.png',
            tag: 'workout-active',
            requireInteraction: false,
            silent: true
          });

          // Auto-close after 5 seconds
          setTimeout(() => notification.close(), 5000);
        } catch (error) {
          console.error('Failed to show notification:', error);
        }
      }
    }
  }

  /**
   * Add a callback to be notified when app returns to foreground
   */
  addForegroundCallback(callback: () => void) {
    this.callbacks.push(callback);
  }

  /**
   * Remove a foreground callback
   */
  removeForegroundCallback(callback: () => void) {
    const index = this.callbacks.indexOf(callback);
    if (index > -1) {
      this.callbacks.splice(index, 1);
    }
  }

  /**
   * Get time spent in background (if currently in background)
   */
  getTimeInBackground(): number {
    if (this.backgroundStartTime !== null) {
      return performance.now() - this.backgroundStartTime;
    }
    return 0;
  }

  /**
   * Check if app is currently in background
   */
  isInBackground(): boolean {
    return document.hidden;
  }

  /**
   * Request notification permission if not already granted
   */
  async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }
}

export const backgroundTimerManager = new BackgroundTimerManager();