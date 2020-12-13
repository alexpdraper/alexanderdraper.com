import { controller } from '@github/catalyst';
import { AppWindowElement } from './app-window';

@controller
export class AppDesktopElement extends HTMLElement {
  #dragTarget: AppWindowElement | null = null;
  #offsetX = 0;
  #offsetY = 0;

  startDragging(event: CustomEvent): void {
    this.#dragTarget = event.target as AppWindowElement;
    this.#offsetX = event.detail.offsetX;
    this.#offsetY = event.detail.offsetY;
  }

  doDragging(event: MouseEvent): void {
    if (!this.#dragTarget) return;
    this.#dragTarget.style.top = `${Math.max(
      event.clientY - this.#offsetY,
      0
    )}px`;
    this.#dragTarget.style.left = `${Math.max(
      event.clientX - this.#offsetX,
      0
    )}px`;
  }

  endDragging(event: MouseEvent): void {
    if (!this.#dragTarget) return;
    this.#dragTarget.dropHandle();
    this.#dragTarget = null;
  }
}
