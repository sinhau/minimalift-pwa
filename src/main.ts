import './ui/app-shell';
import './ui/view-home';
import './ui/view-day';
import { router } from './router';
import { programManager } from './program';

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
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize data
  await programManager.initialize();

  const appShell = document.querySelector('app-shell');
  const content = document.querySelector('#content') as HTMLElement;
  
  if (!content) {
    console.error('Content container not found');
    return;
  }

  // Set up routing
  router.register('/', () => showHome());
  router.register('/day/:id', () => showDay());

  function showHome() {
    content.innerHTML = '<view-home></view-home>';
    const viewHome = content.querySelector('view-home');
    
    viewHome?.addEventListener('navigate-to-day', ((e: CustomEvent) => {
      router.navigate(`/day/${e.detail.dayId}`);
    }) as EventListener);
  }

  function showDay() {
    const params = router.getParams();
    const dayId = params.id;
    
    if (dayId) {
      content.innerHTML = '<view-day></view-day>';
      const viewDay = content.querySelector('view-day') as any;
      
      if (viewDay && viewDay.loadDay) {
        viewDay.loadDay(dayId);
      }

      viewDay?.addEventListener('start-session', ((e: CustomEvent) => {
        console.log('Start session for day:', e.detail.dayId);
        // TODO: Navigate to session view
      }) as EventListener);
    }
  }

  if (appShell) {
    // Listen for day selection from header
    appShell.addEventListener('day-selected', ((e: CustomEvent) => {
      const dayNumber = e.detail.day;
      const dayId = `p1_w1_d${dayNumber}`;
      router.navigate(`/day/${dayId}`);
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