import { controller } from "@github/catalyst";
import { html, render } from "@github/jtml";

@controller
export class AboutMeElement extends HTMLElement {
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
            box-sizing: border-box;
            overflow: hidden;
          }

          .container {
            padding: 0.5rem;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .content {
            overflow-y: auto;
            background-color: #fff;
            height: 100%;
            padding: 1rem;
            line-height: 1.35;
          }

          h2 {
            /*border-top: 1px solid;*/
            /*padding-top: 0.375rem;*/
            padding: 0;
            margin-top: 2rem;
            margin-bottom: 0.5rem;
            line-height: 1.2;
          }

          p {
            margin: 0;
          }

          p:not(:last-child) {
            margin-bottom: 1rem;
          }

          blockquote {
            padding: 0;
            padding-top: 1rem;
            margin: 0;
            border-top: 3px dotted #555;
            margin-bottom: 1rem;
            display: grid;
            grid-template-columns: 1.5rem 1fr;
            gap: 0.5rem;
          }

          blockquote > * {
            grid-column-start: 2;
            grid-column-end: 3;
          }

          blockquote > svg {
            grid-column-start: 1;
            grid-column-end: 2;
          }

          .content > * {
            max-width: 600px;
            margin-right: auto;
            margin-left: auto;
          }
        </style>
        <div class="container">
          <div class="content">
            <p>
              Thanks for visiting my site! I built this project as a fun way to
              experiment with web components. I think it’s pretty fun. While
              you’re here, you can write yourself a note, listen to some of my
              music, or simulate dice rolls using the Dice CLI.
            </p>

            <h2>About me</h2>

            <p>
              I’m Alexander Draper, I do many things, but professionally I lead
              web development teams. I love the web and I love helping others
              make it the best it can be (or at least a little better). I am a
              (mostly) self-taught developer with over 9 years professional
              experience. I am a strong proponent of reading the docs and
              working collaboratively.
            </p>

            <h2>What people say about me</h2>

            <blockquote>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                <path
                  d="M504 224h-56v-8c0-22.1 17.9-40 40-40h8c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-8c-101.5 0-184 82.5-184 184v192c0 39.7 32.3 72 72 72h128c39.7 0 72-32.3 72-72V296c0-39.7-32.3-72-72-72zm24 184c0 13.2-10.8 24-24 24H376c-13.2 0-24-10.8-24-24V216c0-75 61-136 136-136h8v48h-8c-48.5 0-88 39.5-88 88v56h104c13.2 0 24 10.8 24 24v112zM200 224h-56v-8c0-22.1 17.9-40 40-40h8c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-8C82.5 32 0 114.5 0 216v192c0 39.7 32.3 72 72 72h128c39.7 0 72-32.3 72-72V296c0-39.7-32.3-72-72-72zm24 184c0 13.2-10.8 24-24 24H72c-13.2 0-24-10.8-24-24V216c0-75 61-136 136-136h8v48h-8c-48.5 0-88 39.5-88 88v56h104c13.2 0 24 10.8 24 24v112z"
                />
              </svg>
              <p>
                Alex is probably the best engineering manager I’ve ever had in
                my life. He is quick to implement new ideas, and is always a
                great source of encouragement.
              </p>
              <p>
                I feel well advocated-for in my position and in my goals with
                Alex.
              </p>
            </blockquote>

            <blockquote>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                <path
                  d="M325.8 272.2C308.5 292.4 283.1 304 256 304s-52.5-11.6-69.8-31.8c-8.6-10.1-23.8-11.2-33.8-2.7-10.1 8.6-11.2 23.8-2.7 33.8 26.5 31 65.2 48.7 106.3 48.7s79.8-17.8 106.2-48.7c8.6-10.1 7.4-25.2-2.7-33.8-10-8.6-25.1-7.4-33.7 2.7zM192 224c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"
                />
              </svg>
              <p>
                Alex has a great ability to motivate the team and keep everyone
                aligned towards our goals. His encouragement and positive
                approach helps foster a productive and collaborative work
                environment. He does a great job at ensuring that his team is
                taking ownership of their work.
              </p>
              <p>
                Alex is also great at breaking down complex problems into clear,
                understandable explanations. He always ensures that everyone has
                a solid grasp on issues being discussed and potential solutions.
              </p>
            </blockquote>

            <blockquote>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                <path
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-227.9-57.5c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.5 1.9-12.2-4.3-13.2l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6.1 34.9zm259.7-72.7l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6 34.9c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.6 1.8-12.2-4.4-13.2z"
                />
              </svg>
              <p>
                Alex is an incredibly valuable leader — his ability to lead
                resource-constrained teams with creativity, scrappiness, and a
                true spirit of partnership is exceptional. He consistently
                brings a solution-oriented, can-do mindset that helps teams move
                forward even when things are ambiguous or under-resourced.
              </p>
            </blockquote>

            <h2>Some accomplishments</h2>

            <p>
              I built the
              <a
                href="https://chromewebstore.google.com/detail/reading-list/lloccabjgblebdmncjndmiibianflabo"
                target="_blank"
                >#1 Reading List extension on the Chrome Web Store</a
              >. It has over 40,000 users and 4.7/5 stars from 750 reviews.
            </p>

            <p>
              I led the development of
              <a
                href="https://greenspacehealth.com/en-ca/wellness-together-canada-advancing-population-health-nationwide/"
                target="_blank"
                rel="nofollow noreferrer"
                >Wellness Together Canada</a
              >—a mental health portal for Health Canada accessed by millions of
              Canadians. Through Wellness Together Canada and the companion app
              PocketWell users could access and complete personal mental health
              assessments and track their progress over time.
            </p>
          </div>
        </div>
      `,
      this.shadowRoot!,
    );
  }
}
