class WebCli extends HTMLElement {
  #savedInput: string;
  commands: string[];
  commandIndex: number;

  constructor() {
    super();

    this.#savedInput = '';
    this.commands = [];
    this.commandIndex = -1;

    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create elements
    const $wrapper = document.createElement('div');
    $wrapper.setAttribute('class', 'console');

    const $output = document.createElement('div');
    $output.setAttribute('class', 'console-output');

    const $inputForm = document.createElement('form');
    $inputForm.setAttribute('class', 'input-form');

    const $input = document.createElement('input');
    const $submitButton = document.createElement('button');
    $submitButton.textContent = '⏎';
    $inputForm.appendChild($input);
    $inputForm.appendChild($submitButton);

    $inputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let value = $input.value.trim();

      if (value) {
        const $line = document.createElement('div');
        $line.setAttribute('class', 'line in');
        $line.textContent = '> ' + value;
        $input.value = '';
        $input.focus();
        $output.appendChild($line);
        $output.scrollTop = $output.scrollHeight;

        this.commands = [value].concat(this.commands);
        this.#savedInput = '';
        this.commandIndex = -1;
        this.dispatchEvent(new CustomEvent('line', { detail: value }));
      }
    });

    $input.addEventListener('keydown', (event) => {
      if (!this.commands.length) return;
      if (event.key === 'ArrowUp') {
        if (this.commandIndex === -1) {
          this.#savedInput = $input.value;
        }
        this.commandIndex = this.commandIndex + 1;
      } else if (event.key === 'ArrowDown') {
        this.commandIndex = this.commandIndex - 1;
      } else {
        return;
      }

      event.preventDefault();

      this.commandIndex = Math.min(this.commandIndex, this.commands.length - 1);
      this.commandIndex = Math.max(this.commandIndex, -1);

      if (this.commandIndex === -1) {
        $input.value = this.#savedInput;
      } else {
        $input.value = this.commands[this.commandIndex];
      }
    });

    $wrapper.appendChild($output);
    $wrapper.appendChild($inputForm);

    const textColor = '#f0f0f0';
    const bgColor = '#333';

    // Style
    const $style = document.createElement('style');
    $style.textContent = `
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      .console {
        font-family: Tabular, Fira Code, Input Mono, Courier, Menlo, Andale Mono, monospace;
        font-size: 16px;
        color: ${textColor};
        padding: 0.5em;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .console-output {
        height: 100%;
        overflow-y: auto;
        word-break: break-all;
        background-color: ${bgColor};
      }

      .input-form {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0;
        margin-top: 0.5em;
        padding: 0;
      }

      .input-form::before {
        content: ">";
        margin-left: 0.5em;
        color: #999;
        position: absolute;
      }

      input,
      button {
        font-family: inherit;
        font-size: inherit;
      }

      input {
        flex-grow: 1;
        border: 0;
        padding: 4px;
        padding-left: 1.5em;
        margin: 0;
        margin-right: 0.5em;
        color: inherit;
        background-color: ${bgColor};
        box-shadow: 0 4px 8px rgba(10, 10, 10, 0.15);
      }

      button {
        box-shadow: inset 0px 1px 0px 0px #ffffff;
        background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
        background-color: #ffffff;
        border-radius: 4px;
        border: 1px solid #dbdbdb;
        display: inline-block;
        color: #666666;
        padding: 3px 10px;
        text-decoration: none;
        text-shadow: 0px 1px 0px #ffffff;
      }

      button:hover {
        background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
        background-color: #f6f6f6;
      }

      button:active {
        transform: translateY(1px);
      }

      .line {
        padding: 0 0.5em;
        line-height: 1.2;
      }

      .line:first-child {
        padding-top: 0.5em;
      }

      .line:last-child {
        padding-bottom: 0.5em;
      }

      .line.in {
        color: #999;
      }
    `;

    shadow.appendChild($style);
    shadow.appendChild($wrapper);
  }

  addLine(input: string): void {
    const $output = this.shadowRoot?.querySelector('.console-output');
    if (!$output) return;
    const $line = document.createElement('div');
    $line.setAttribute('class', 'line');
    $line.textContent = input;
    $output.appendChild($line);
    $output.scrollTop = $output.scrollHeight;
  }
}

export { WebCli };

export default WebCli;
