import { controller } from '@github/catalyst';
import { AppWindowElement } from './app-window';

@controller
export class AppDesktopElement extends HTMLElement {
  #dragTarget: AppWindowElement | null = null;
  #offsetX = 0;
  #offsetY = 0;
  #onMouseMove?: (event: MouseEvent) => void;
  #onMouseUp?: (event: MouseEvent) => void;

  connectedCallback() {
    this.#onMouseMove = this.doDragging.bind(this);
    this.#onMouseUp = this.endDragging.bind(this);
    window.addEventListener('mousemove', this.#onMouseMove);
    window.addEventListener('mouseup', this.#onMouseUp);
  }

  disconnectedCallback() {
    if (this.#onMouseMove) {
      window.removeEventListener('mousemove', this.#onMouseMove);
    }
    if (this.#onMouseUp) {
      window.removeEventListener('mouseup', this.#onMouseUp);
    }
  }

  startDragging(event: CustomEvent): void {
    this.#dragTarget = event.target as AppWindowElement;
    this.#offsetX = event.detail.offsetX;
    this.#offsetY = event.detail.offsetY;
  }

  doDragging(event: MouseEvent): void {
    if (!this.#dragTarget) return;
    const x = Math.max(
      event.clientX - this.#offsetX,
      0
    );
    const y = Math.max(
      event.clientY - this.#offsetY,
      0
    );
    this.#dragTarget.style.transform = `translate(${x}px, ${y}px)`;
  }

  endDragging(event: MouseEvent): void {
    if (!this.#dragTarget) return;
    this.#dragTarget.dropHandle();
    this.#dragTarget = null;
  }

  launchApp(event: CustomEvent<{ name: string; id: string; }>) {
    // Only one of each app at a time
    if (this.querySelector(event.detail.id)) return;

    const appWindow = this.createAppWindow(event.detail.name);
    this.firstElementChild!.appendChild(appWindow);

    const appElement = document.createElement(event.detail.id);
    appElement.classList.add('h-full');
    appWindow.appendChild(appElement);
  }

  createAppWindow(appName: string): AppWindowElement {
    const appWindow = document.createElement('app-window') as AppWindowElement;
    appWindow.setAttribute('app-name', appName);
    appWindow.addEventListener<any>('grabbed', this.startDragging.bind(this));
    return appWindow;
  }
}
