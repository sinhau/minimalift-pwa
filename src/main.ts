import './ui/app-shell';
import './ui/view-home';
import './ui/view-day';
import './ui/view-session';
import './ui/update-indicator';
import { router } from './router';
import { programManager } from './program';

// Service worker registration is now handled by AppUpdater

// Initialize app with error handling
document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM loaded, initializing app...');
  try {
  // Initialize data
  console.log('Initializing program manager...');
  await programManager.initialize();
  console.log('Program manager initialized');

  // Wait for app-shell to be fully initialized
  const appShell = document.querySelector('app-shell');
  if (!appShell) {
    console.error('App shell not found');
    return;
  }

  console.log('Found app shell, waiting for shadow DOM...');

  // Wait for the shadow DOM to be ready
  await new Promise(resolve => {
    const check = () => {
      const shadowRoot = (appShell as any).shadowRoot;
      if (shadowRoot && shadowRoot.querySelector('#content')) {
        console.log('Shadow DOM ready');
        resolve(void 0);
      } else {
        setTimeout(check, 10);
      }
    };
    check();
  });
  
  const content = (appShell as any).shadowRoot.querySelector('#content') as HTMLElement;
  
  if (!content) {
    console.error('Content container not found');
    return;
  }

  // Set up routing
  router.register('/', () => showHome());
  router.register('/day/:id', () => showDay());
  router.register('/session/:id', () => showSession());

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
        router.navigate(`/session/${e.detail.dayId}`);
      }) as EventListener);
    }
  }

  async function showSession() {
    const params = router.getParams();
    const dayId = params.id;
    
    if (dayId) {
      const day = await programManager.getDay(dayId);
      if (day) {
        content.innerHTML = '<view-session></view-session>';
        const viewSession = content.querySelector('view-session') as any;
        
        if (viewSession && viewSession.setDay) {
          viewSession.setDay(day);
        }

        viewSession?.addEventListener('session-complete', ((e: CustomEvent) => {
          console.log('Session completed:', e.detail);
          router.navigate(`/day/${dayId}`);
        }) as EventListener);
      }
    }
  }

  if (appShell) {
    // Listen for day selection from header
    appShell.addEventListener('day-selected', ((e: CustomEvent) => {
      const dayNumber = e.detail.day;
      const dayId = `p1_w1_d${dayNumber}`;
      router.navigate(`/day/${dayId}`);
    }) as EventListener);
  }

  // Start the router
  console.log('Starting router...');
  router.start();
  
  // Default to Day 1 if no hash is set
  if (!window.location.hash || window.location.hash === '#/') {
    console.log('No hash found, navigating to Day 1');
    router.navigate('/day/p1_w1_d1');
  } else {
    console.log('Found hash:', window.location.hash);
  }
  
  console.log('App initialization complete');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Show error message to user
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <h1>Oops! Something went wrong</h1>
        <p>There was an error loading Minimalift. Please refresh the page to try again.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px; background: #007AFF; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Reload App
        </button>
      </div>
    `;
  }
});