type RouteHandler = () => void;

interface Route {
  path: string;
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];
  private currentPath: string = '';

  constructor() {
    window.addEventListener('hashchange', () => this.handleRouteChange());
    window.addEventListener('DOMContentLoaded', () => this.handleRouteChange());
  }

  register(path: string, handler: RouteHandler): void {
    this.routes.push({ path, handler });
  }

  navigate(path: string): void {
    window.location.hash = path;
  }

  private handleRouteChange(): void {
    const hash = window.location.hash.slice(1) || '/';
    this.currentPath = hash;

    // Find matching route
    const route = this.routes.find(r => {
      if (r.path.includes(':')) {
        // Handle dynamic routes like /day/:id
        const regex = new RegExp('^' + r.path.replace(/:[^/]+/g, '([^/]+)') + '$');
        return regex.test(hash);
      }
      return r.path === hash;
    });

    if (route) {
      route.handler();
    } else {
      // Default to home
      const homeRoute = this.routes.find(r => r.path === '/');
      if (homeRoute) {
        homeRoute.handler();
      }
    }
  }

  getParams(): Record<string, string> {
    const hash = window.location.hash.slice(1) || '/';
    const params: Record<string, string> = {};

    // Find matching route with params
    this.routes.find(r => {
      if (r.path.includes(':')) {
        const pathParts = r.path.split('/');
        const hashParts = hash.split('/');
        
        if (pathParts.length === hashParts.length) {
          let matches = true;
          for (let i = 0; i < pathParts.length; i++) {
            if (pathParts[i].startsWith(':')) {
              params[pathParts[i].slice(1)] = hashParts[i];
            } else if (pathParts[i] !== hashParts[i]) {
              matches = false;
              break;
            }
          }
          return matches;
        }
      }
      return false;
    });

    return params;
  }

  getCurrentPath(): string {
    return this.currentPath;
  }
}

export const router = new Router();