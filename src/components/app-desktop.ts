import { controller, targets } from '@github/catalyst';
import { AppWindowElement } from './app-window';

@controller
export class AppDesktopElement extends HTMLElement {
  @targets appWindows!: AppWindowElement[];

  #dragTarget: AppWindowElement | null = null;
  #offsetX = 0;
  #offsetY = 0;
  #onMouseMove?: (event: MouseEvent) => void;
  #onMouseUp?: (event: MouseEvent) => void;
  #apps: AppWindowElement[] = [];

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
    this.#apps.push(
      this.#apps.splice(this.#apps.indexOf(this.#dragTarget), 1)[0]
    );
    this.stackWindows();
  }

  doDragging(event: MouseEvent): void {
    if (!this.#dragTarget) return;
    const x = Math.max(event.clientX - this.#offsetX, 0);
    const y = Math.max(event.clientY - this.#offsetY, 0);
    this.#dragTarget.style.transform = `translate(${x}px, ${y}px)`;
  }

  endDragging(event: MouseEvent): void {
    if (!this.#dragTarget) {
      if (event.target instanceof AppWindowElement) {
        event.target.saveStyle();
        this.#apps.push(
          this.#apps.splice(this.#apps.indexOf(event.target), 1)[0]
        );
        this.stackWindows();
      }
      return;
    }
    this.#dragTarget.dropHandle();
    this.#dragTarget = null;
  }

  launchApp(event: CustomEvent<{ name: string; id: string }>) {
    // Only one of each app at a time
    const existingAppIndex = this.#apps.findIndex(
      (appWindow) => appWindow.getAttribute('app-id') === event.detail.id
    );
    if (existingAppIndex !== -1) {
      this.#apps.push(this.#apps.splice(existingAppIndex, 1)[0]);
      this.stackWindows();
      this.#apps[this.#apps.length - 1].focus();
      return;
    }

    const appWindow = this.createAppWindow(event.detail.name, event.detail.id);
    this.firstElementChild!.appendChild(appWindow);
    this.#apps.push(appWindow);
    this.stackWindows();

    const appElement = document.createElement(event.detail.id);
    appWindow.appendChild(appElement);
  }

  createAppWindow(appName: string, appId: string): AppWindowElement {
    const appWindow = document.createElement('app-window') as AppWindowElement;
    appWindow.setAttribute('data-targets', 'app-desktop.appWindows');
    appWindow.setAttribute('app-name', appName);
    appWindow.setAttribute('app-id', appId);
    appWindow.style.transform = 'translate(32px, 32px)';
    appWindow.style.width = '300px';
    appWindow.style.height = '300px';
    appWindow.addEventListener<any>('grabbed', this.startDragging.bind(this));
    appWindow.addEventListener<any>('close-app', this.closeApp.bind(this));
    return appWindow;
  }

  closeApp(event: CustomEvent<undefined>): void {
    const appWindow = event.target as AppWindowElement;
    const index = this.#apps.indexOf(appWindow);
    if (index !== -1) {
      this.#apps.splice(index, 1);
    }
    this.firstElementChild!.removeChild(appWindow);
  }

  stackWindows(): void {
    this.#apps.forEach((appWindow, index) => {
      appWindow.style.zIndex = (index + 1).toString();
    });
  }
}
