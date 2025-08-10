import './ui/app-shell';

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registered:', registration);
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  const appShell = document.querySelector('app-shell');
  
  if (appShell) {
    // Listen for day selection
    appShell.addEventListener('day-selected', ((e: CustomEvent) => {
      console.log('Day selected:', e.detail.day);
      // TODO: Load day's workout
    }) as EventListener);
    
    // Listen for settings
    appShell.addEventListener('open-settings', () => {
      console.log('Open settings');
      // TODO: Show settings modal
    });
  }
  
  // Request wake lock if available
  if ('wakeLock' in navigator) {
    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible') {
        try {
          await (navigator as any).wakeLock.request('screen');
          console.log('Wake lock acquired');
        } catch (err) {
          console.error('Wake lock error:', err);
        }
      }
    });
  }
});