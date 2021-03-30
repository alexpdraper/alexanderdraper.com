import { controller, target } from '@github/catalyst';
import { html, render } from '@github/jtml';

@controller
export class AppWindowElement extends HTMLElement {
  static get observedAttributes() {
    return ['app-name', 'app-id'];
  }

  private readonly styles = `
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :host {
      display: flex;
      flex-direction: column;
      position: absolute;
      border: 1px solid rgb(75, 85, 99) !important;
      overflow: hidden;
      background-color: #fff;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2363100f' fill-opacity='0.25' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
    }

    .window-header {
      width: 100%;
      height: 2rem;
      border-bottom: 1px solid rgb(75, 85, 99);
      display: flex;
      align-items: center;
      padding: 0.5rem;
      cursor: grab;
      line-height: 1;
      font-size: 0.75rem;
      color: rgb(75, 85, 99);
      user-select: none;
    }

    .close-button {
      width: 1rem;
      height: 1rem;
      border-radius: 9999px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      line-height: 1;
      background-color: rgb(238, 113, 113);
      color: rgb(254, 226, 226);
      border: 0;
      text-align: center;
      margin-right: 0.5rem;
    }
  `;

  @target dragHandle!: HTMLElement;

  connectedCallback() {
    this.classList.add('shadow-lg', 'resize');

    const style = window.localStorage.getItem(
      `${this.getAttribute('app-name')}-style`
    );
    if (style) {
      this.setAttribute('style', style);
    }

    this.attachShadow({ mode: 'open' });
    this.update();
  }

  attributeChangedCallback(
    attributeName: string,
    oldValue: string,
    newValue: string
  ) {
    if (attributeName === 'app-name' && this.shadowRoot) {
      this.update();
    }
  }

  private update() {
    const appName = this.getAttribute('app-name') || 'Nameless';
    render(
      html`
        <style>
          ${this.styles}
        </style>
        <div
          class="window-header"
          data-action="mousedown:app-window#grabHandle"
          data-target="app-window.dragHandle"
        >
          <button
            class="close-button"
            data-action="click:app-window#closeWindow"
          >
            <span>&times;</span>
          </button>
          ${appName}
        </div>
        <slot></slot>
      `,
      this.shadowRoot!
    );
  }

  closeWindow(event: MouseEvent): void {
    this.parentElement?.removeChild(this);
  }

  grabHandle(event: MouseEvent): void {
    if (event.target !== this.dragHandle) return;
    event.preventDefault();
    this.dragHandle.style.cursor = 'grabbing';
    this.dispatchEvent(
      new CustomEvent('grabbed', {
        detail: {
          offsetX: event.offsetX,
          offsetY: event.offsetY,
        },
      })
    );
  }

  dropHandle(): void {
    this.dragHandle.style.cursor = '';
    window.localStorage.setItem(
      `${this.getAttribute('app-name')}-style`,
      this.getAttribute('style') || ''
    );
  }
}
