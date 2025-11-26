import { controller } from "@github/catalyst";
import { html, render } from "@github/jtml";

type ObservedAttributeName = "icon-src" | "app-name" | "app-id" | "app-open";

@controller
export class AppStartButtonElement extends HTMLElement {
  static get observedAttributes(): ObservedAttributeName[] {
    return ["icon-src", "app-name", "app-id", "app-open"];
  }

  get iconSrc(): string {
    return this.getAttribute("icon-src") || "";
  }

  get appOpen(): boolean {
    return this.hasAttribute("app-open");
  }

  set appOpen(value: boolean) {
    this.toggleAttribute("app-open", value);
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.update();
  }

  attributeChangedCallback(
    name: ObservedAttributeName,
    oldValue: string,
    newValue: string
  ) {
    if (
      this.shadowRoot &&
      (name === "icon-src" || name === "app-name" || name === "app-open")
    ) {
      this.update();
    }
  }

  update(): void {
    render(
      html`
        <style>
          :host {
            --icon-height: 30px;
            --icon-width: var(--icon-height);
          }

          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          button {
            height: 40px;
            width: 120px;
            display: grid;
            grid-template-columns: var(--icon-width) auto;
            align-items: center;
            gap: 5px;
            border: 0;
            background-color: #ffffff;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2363100f' fill-opacity='0.25' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
            background-position: fixed;
            font-family: inherit;
            padding: 5px;
            margin: 0;
            text-align: left;
          }

          .icon-wrapper {
            width: var(--icon-width);
            height: var(--icon-height);
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
            padding: 5px;
          }

          .icon-wrapper ::slotted(*) {
            fill: cornflowerblue;
          }

          button:is(:hover, .open) {
            background-color: #93c5fd;
          }

          /* button:is(:hover, .open) .icon-wrapper {
            background-color: cornflowerblue;
          } */

          button:is(:hover, .open) .icon-wrapper ::slotted(*) {
            fill: royalblue;
          }

          img {
            display: block;
            height: 100%;
            width: auto;
          }

          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            width: auto;
            font-size: 13px;
            line-height: 1;
            white-space: nowrap;
          }
        </style>
        <button
          class="${this.appOpen ? "open" : ""}"
          data-action="click:app-start-button#launchApp"
          title="${this.getAttribute("app-name") ?? ""}"
        >
          <div class="icon-wrapper">
            <slot name="icon">
              ${this.iconSrc
                ? html`<img src="${this.iconSrc}" />`
                : html`<div class="placeholder"></div>`}
            </slot>
          </div>
          <span class="title"> ${this.getAttribute("app-name")} </span>
        </button>
      `,
      this.shadowRoot!
    );
  }

  launchApp(): void {
    this.dispatchEvent(
      new CustomEvent("launch", {
        detail: {
          id: this.getAttribute("app-id"),
          name: this.getAttribute("app-name"),
        },
      })
    );
  }
}
