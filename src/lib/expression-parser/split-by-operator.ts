import { ExpressionArray } from './expression-array.interface';

export function splitByOperator(expressions: ExpressionArray): ExpressionArray {
  const result: ExpressionArray = [];
  for (const expression of expressions) {
    if (Array.isArray(expression)) {
      result.push(splitByOperator(expression));
    } else {
      expression
        .replace(/\s+/g, '')
        .split(/(\+|\-|\*|\/)/g)
        .filter((val) => val !== '')
        .forEach((val) => result.push(val));
    }
  }
  return result;
}
