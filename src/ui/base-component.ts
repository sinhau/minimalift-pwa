/**
 * Base class for all Web Components in the application.
 * Provides common functionality and lifecycle methods.
 */
export abstract class BaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  /**
   * Render the component's HTML and styles.
   * Must be implemented by subclasses.
   */
  protected abstract render(): void;

  /**
   * Set up event listeners for the component.
   * Override in subclasses to add specific listeners.
   */
  protected setupEventListeners(): void {
    // Default: no event listeners
  }

  /**
   * Clean up resources when component is removed.
   * Override in subclasses to clean up timers, observers, etc.
   */
  protected cleanup(): void {
    // Default: no cleanup needed
  }

  /**
   * Helper method to update innerHTML safely
   */
  protected setHTML(html: string): void {
    if (this.shadow) {
      this.shadow.innerHTML = html;
    }
  }

  /**
   * Helper method to dispatch custom events
   */
  protected emit(eventName: string, detail?: any): void {
    this.dispatchEvent(new CustomEvent(eventName, { 
      detail, 
      bubbles: true, 
      composed: true 
    }));
  }

  /**
   * Helper method to query shadow DOM
   */
  protected $(selector: string): Element | null {
    return this.shadow?.querySelector(selector) ?? null;
  }

  /**
   * Helper method to query all in shadow DOM
   */
  protected $$(selector: string): NodeListOf<Element> {
    return this.shadow?.querySelectorAll(selector) ?? [];
  }
}