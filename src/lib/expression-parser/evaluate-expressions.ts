import { GroupedExpression } from './grouped-expression.interface';

export function evaluateExpression(expressions: GroupedExpression[]): number {
  let result = 0;

  for (const expression of expressions) {
    let value = 0;

    if (Array.isArray(expression.value)) {
      value = evaluateExpression(expression.value);
    } else if (
      typeof expression.value === 'number' &&
      !Number.isNaN(expression.value)
    ) {
      value = expression.value;
    }

    if (expression.negative) {
      value = -value;
    }

    const { operator } = expression;
    if (operator === '+') result += value;
    else if (operator === '-') result -= value;
    else if (operator === '*') result *= value;
    else if (operator === '/') result /= value;
  }

  return result;
}
