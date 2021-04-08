import { controller, target } from '@github/catalyst';
import WebCli from './web-cli';
import { html, render } from '@github/jtml';
import Dice from './dice';
import { expressionParser } from '../../lib/expression-parser/expression-parser';

window.customElements.define('web-cli', WebCli);

@controller
export class DiceCliElement extends HTMLElement {
  @target webCli!: WebCli;

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.update();
    this.style.display = 'block;';
    this.style.height = '100%';
    this.style.overflow = 'hidden';
    this.webCli.addLine('Roll some dice! Try “1d6 + 3”');
  }

  readLine(event: CustomEvent<string>): void {
    const { dice, expression } = this.evaluateDiceRolls(event.detail);

    if (dice.length) {
      this.webCli.addLine(expression);
      dice.forEach((die) => {
        this.webCli.addLine(
          `${die.rolls.length}d${die.sides}: ${die.rolls.join(' + ')} = ${
            die.total
          }`
        );
      });
      this.webCli.addLine('—');
    }

    let message: string;
    try {
      message = expressionParser(expression).toString();
    } catch (error) {
      message = error.message;
    }

    this.webCli.addLine(message);
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
        </style>
        <web-cli
          style="height: 100%"
          data-target="dice-cli.webCli"
          data-action="line:dice-cli#readLine"
        ></web-cli>
      `,
      this.shadowRoot!
    );
  }

  private evaluateDiceRolls(
    expr: string
  ): { dice: Dice[]; expression: string } {
    const dice: Dice[] = [];
    const expression = expr.replace(/\d+d\d+/gi, (match: string): string => {
      const [rolls, sides] = match
        .toLowerCase()
        .split('d')
        .map((str) => parseInt(str, 10));
      const die = new Dice(sides);
      die.roll(rolls);
      dice.push(die);
      return die.lastRollsTotal.toString();
    });
    return { dice, expression };
  }
}
