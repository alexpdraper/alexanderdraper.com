import { controller, target } from '@github/catalyst';
import { html, render } from '@github/jtml';

@controller
export class NotePadElement extends HTMLElement {
  @target noteContent!: HTMLElement;

  private readonly contentKey = 'notepad-content';

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.update();

    this.noteContent.textContent = this.getContent();
  }

  getContent(): string {
    return window.localStorage.getItem(this.contentKey) || '';
  }

  saveContent(): void {
    window.localStorage.setItem(
      this.contentKey,
      this.noteContent.textContent || ''
    );
  }

  update() {
    render(
      html`
        <style>
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          :host,
          .h-full {
            height: 100%;
          }
          :host {
            padding: 0.5rem;
          }
          .note-content {
            line-height: 1.4;
            border: 1px solid rgb(75, 85, 99);
            padding: 0.25rem;
            width: 100%;
            height: 100%;
            background-color: #fafafa;
            white-space: pre-wrap;
          }
        </style>
        <div
          class="note-content"
          contenteditable
          data-target="note-pad.noteContent"
          data-action="blur:note-pad#saveContent"
        ></div>
      `,
      this.shadowRoot!
    );
  }
}
