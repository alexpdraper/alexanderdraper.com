import { controller, target } from '@github/catalyst';

@controller
export class AppWindowElement extends HTMLElement {
  @target dragHandle!: HTMLElement;

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
    this.dragHandle.style.cursor = 'grab';
  }
}
