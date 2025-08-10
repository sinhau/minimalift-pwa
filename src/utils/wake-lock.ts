/**
 * Wake Lock utility for keeping the screen active during workouts
 */
export class WakeLockManager {
  private wakeLock: WakeLockSentinel | null = null;
  private isSupported = 'wakeLock' in navigator;

  /**
   * Request a wake lock to prevent screen from sleeping
   */
  async acquire(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn('Wake Lock API not supported');
      return false;
    }

    try {
      if (this.wakeLock) {
        // Already have an active wake lock
        return true;
      }

      this.wakeLock = await (navigator as any).wakeLock.request('screen');
      
      this.wakeLock.addEventListener('release', () => {
        console.log('Wake lock released');
        this.wakeLock = null;
      });

      console.log('Wake lock acquired');
      return true;
    } catch (err) {
      console.error('Failed to acquire wake lock:', err);
      return false;
    }
  }

  /**
   * Release the current wake lock
   */
  async release(): Promise<void> {
    if (this.wakeLock) {
      try {
        await this.wakeLock.release();
        this.wakeLock = null;
        console.log('Wake lock released manually');
      } catch (err) {
        console.error('Failed to release wake lock:', err);
      }
    }
  }

  /**
   * Check if wake lock is currently active
   */
  isActive(): boolean {
    return this.wakeLock !== null && !this.wakeLock.released;
  }

  /**
   * Check if wake lock API is supported
   */
  isSupported(): boolean {
    return this.isSupported;
  }

  /**
   * Re-acquire wake lock if it was lost (e.g., after tab became inactive)
   */
  async reacquire(): Promise<boolean> {
    if (this.wakeLock && this.wakeLock.released) {
      this.wakeLock = null;
      return await this.acquire();
    }
    return this.isActive();
  }
}

export const wakeLockManager = new WakeLockManager();