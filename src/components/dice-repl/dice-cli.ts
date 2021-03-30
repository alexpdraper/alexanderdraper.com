import { controller, target } from '@github/catalyst';
import parse from './parse';
import WebCli from './web-cli';
import { html, render } from '@github/jtml';

window.customElements.define('web-cli', WebCli);

@controller
export class DiceCliElement extends HTMLElement {
  @target webCli!: WebCli;

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.update();
    this.webCli.addLine('Roll some dice! Try “1d6 + 3”');
  }

  readLine(event: CustomEvent<string>): void {
    try {
      const fn = parse(event.detail);
      const result = fn();
      this.webCli.addLine(result.toString());
    } catch (e) {
      this.webCli.addLine(e.message);
    }
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
        </style>
        <web-cli
          class="h-full"
          ;
          data-target="dice-cli.webCli"
          data-action="line:dice-cli#readLine"
        ></web-cli>
      `,
      this.shadowRoot!
    );
  }
}
