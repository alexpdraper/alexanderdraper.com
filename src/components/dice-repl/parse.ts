import Dice from './dice';

const operations = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '*': (a: number, b: number) => a * b,
  '/': (a: number, b: number) => a / b,
};
const operators = Object.keys(operations);
const operatorRE = /(\+|\-|\*|\/)/g;
type OpString = '+' | '-' | '*' | '/';

function evaluate(
  total: number,
  item: OpString | number | (() => number) | any[],
  index: number,
  arr: any[]
): number {
  if (typeof item === 'string' && operators.indexOf(item) >= 0) return total;
  let operator: OpString = '+';

  if (index > 0) {
    if (operators.indexOf(arr[index - 1]) >= 0) {
      operator = arr[index - 1];
    }
  }

  let value: number;

  if (Array.isArray(item)) {
    value = item.reduce(evaluate, 0);
  } else if (typeof item === 'function') {
    value = item();
  } else {
    value = typeof item === 'string' ? parseInt(item, 10) : item;
  }

  return operations[operator](total, value);
}

function parse(expression: string | string[]) {
  const expressionString = Array.isArray(expression)
    ? expression.reduce((result, arg) => `${result} ${arg}`, '')
    : expression;

  const expressionArr = expressionString
    .split(/\(|\)/g)
    .filter((item) => item !== '')
    .map((expr) =>
      expr
        .replace(operatorRE, ' $1 ')
        .trim()
        .split(/\s+/g)
        .map((arg) => {
          if (operators.indexOf(arg) >= 0) return arg;
          if (!isNaN(Number(arg))) return Number(arg);
          if (/^\d+d\d+$/i.test(arg)) {
            const [numRolls, sides] = arg.split(/d/i).map((num) => Number(num));
            const dice = new Dice(sides);
            return () => {
              dice.reset().roll(numRolls);
              return dice.total;
            };
          }
          throw new Error(`Unrecognized argument: ${arg}`);
        })
    );

  const parsed: (
    | OpString
    | number
    | (() => number)
    | any[]
  )[] = expressionArr.reduce((result, arr) => {
    let expr = arr.slice();

    let firstArg = expr[0];
    if (typeof firstArg === 'string' && operators.indexOf(firstArg) >= 0) {
      result.push(firstArg as OpString);
      expr = expr.slice(1);
    }

    let lastArg = expr[expr.length - 1];
    if (typeof lastArg === 'string' && operators.indexOf(lastArg) >= 0) {
      result.push(expr.slice(0, expr.length - 1));
      result.push(lastArg as OpString);
    } else {
      result.push(expr);
    }
    return result;
  }, [] as (OpString | number | (() => number) | any[])[]);

  console.log('Result:', parsed);

  return () => parsed.reduce(evaluate, 0);
}

export default parse;
