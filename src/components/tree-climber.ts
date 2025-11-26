import { controller } from "@github/catalyst";
import { html, render } from "@github/jtml";

@controller
export class TreeClimberElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.update();
  }

  update() {
    return render(
      html`
        <style>
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          :host {
            display: block;
            width: 100%;
            height: 100%;
          }

          .container {
            padding: 0.5rem;
            width: 100%;
            height: 100%;
          }

          iframe {
            border: 0;
            width: 100%;
            height: 100%;
          }
        </style>
        <div class="container">
          <iframe
            frameborder="0"
            src="https://itch.io/embed-upload/4207823?color=37313b"
            allowfullscreen=""
            width="720"
            height="425"
            ><a href="https://alexdraper.itch.io/the-tree-climber"
              >Play The Tree Climber on itch.io</a
            ></iframe
          >
        </div>
      `,
      this.shadowRoot!,
    );
  }
}
