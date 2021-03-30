import { controller } from "@github/catalyst";
import { html, render } from '@github/jtml';

type ObservedAttributeName = 'icon-src' | 'app-name' | 'app-id';

@controller
export class AppStartButtonElement extends HTMLElement {
  static get observedAttributes(): ObservedAttributeName[] {
    return ['icon-src', 'app-name', 'app-id'];
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback(
    name: ObservedAttributeName,
    oldValue: string,
    newValue: string,
  ) {
    if (name === 'icon-src' || name === 'app-name') {
      this.update();
    }
  }

  update(): void {
    render(html`
      <button
        class="flex flex-col w-20 h-full items-center p-1 border border-gray-600 bg-white bg-pattern-texture shadow hover:shadow-sm hover:bg-gray-200"
        data-action="click:app-start-button#launchApp"
      >
        <img
          class="block w-full h-auto"
          src="${this.getAttribute('icon-src')}"
        />
        <span class="text-xs font-system leading-none mt-1">
          ${this.getAttribute('app-name')}
        </span>
      </button>
    `, this);
  }

  launchApp(): void {
    this.dispatchEvent(new CustomEvent(
      'launch',
      {
        detail: {
          id: this.getAttribute('app-id'),
          name: this.getAttribute('app-name'),
        }
      }
    ));
  }
}
