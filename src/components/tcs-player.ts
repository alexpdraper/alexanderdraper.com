import { controller } from "@github/catalyst";
import { html, render } from "@github/jtml";

@controller
export class TCSPlayerElement extends HTMLElement {
  static get observedAttributes() {
    return ["album-name"];
  }

  get albumName(): string {
    return this.getAttribute("album-name") || "";
  }

  set albumName(value: string) {
    this.setAttribute("album-name", value);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "album-name" && this.shadowRoot) {
      this.update();
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.update();
  }

  private get albumIframe() {
    let src = "";
    let href = "";
    let title = "";

    if (this.albumName === "Stroll Through the Clouds") {
      src =
        "https://bandcamp.com/EmbeddedPlayer/track=3656607482/size=large/bgcol=ffffff/linkcol=63b2cc/artwork=small/transparent=true/";
      href =
        "https://alexanderdraper.bandcamp.com/track/stroll-through-the-clouds";
      title = "Stroll Through the Clouds by Alexander Draper";
    } else if (this.albumName === "Permeating the Aether") {
      src =
        "https://bandcamp.com/EmbeddedPlayer/album=3207065765/size=large/bgcol=ffffff/linkcol=63b2cc/artwork=small/transparent=true/";
      href = "https://alexanderdraper.bandcamp.com/album/permeating-the-aether";
      title = "Permeating the Aether by Alexander Draper";
    } else {
      src =
        "https://bandcamp.com/EmbeddedPlayer/album=2889781778/size=large/bgcol=ffffff/linkcol=63b2cc/artwork=small/transparent=true/";
      href = "http://thecrystalships.bandcamp.com/album/the-tide";
      title = "The Tide by The Crystal Ships";
    }

    return html`
      <iframe src="${src}" seamless="">
        <a href="${href}">${title}</a>
      </iframe>
    `;
  }

  switchAlbum(event: MouseEvent) {
    const button = event.target;
    if (button instanceof HTMLButtonElement) {
      this.albumName = button.textContent?.trim() || "";
    }
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
            display: grid;
            grid-template-rows: auto 1fr;
            gap: 0.5rem;
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
          <div class="buttons">
            <button data-action="click:tcs-player#switchAlbum">The Tide</button>
            <button data-action="click:tcs-player#switchAlbum">
              Stroll Through the Clouds
            </button>
            <button data-action="click:tcs-player#switchAlbum">
              Permeating the Aether
            </button>
          </div>
          ${this.albumIframe}
        </div>
      `,
      this.shadowRoot!
    );
  }
}
