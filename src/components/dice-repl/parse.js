import Dice from './dice.js';

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};
const operators = Object.keys(operations);
const operatorRE = /(\+|\-|\*|\/)/g;

function evaluate(total, item, index, arr) {
  if (operators.indexOf(item) >= 0) return total;
  let operator = '+';

  if (index > 0) {
    if (operators.indexOf(arr[index - 1]) >= 0) {
      operator = arr[index - 1];
    }
  }

  let value;

  if (Array.isArray(item)) {
    value = item.reduce(evaluate, 0);
  } else if (typeof item === 'function') {
    value = item();
  } else {
    value = item;
  }

  return operations[operator](total, value);
}

function parse(expression) {
  let parsed = Array.isArray(expression)
    ? expression.reduce((result, arg) => `${result} ${arg}`, '')
    : expression;

  parsed = parsed
    .split(/\(|\)/g)
    .filter((item) => item !== '')
    .map((expr) =>
      expr
        .replace(operatorRE, ' $1 ')
        .trim()
        .split(/\s+/g)
        .map((arg) => {
          if (operators.indexOf(arg) >= 0) return arg;
          if (!isNaN(arg)) return Number(arg);
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

  parsed = parsed.reduce((result, arr) => {
    let expr = arr.slice();

    let firstArg = expr[0];
    if (operators.indexOf(firstArg) >= 0) {
      result.push(firstArg);
      expr = expr.slice(1);
    }

    let lastArg = expr[expr.length - 1];
    if (operators.indexOf(lastArg) >= 0) {
      result.push(expr.slice(0, expr.length - 1));
      result.push(lastArg);
    } else {
      result.push(expr);
    }
    return result;
  }, []);

  console.log('Result:', parsed);

  return () => parsed.reduce(evaluate, 0);
}

export default parse;
