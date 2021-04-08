import { ExpressionArray } from './expression-array.interface';
import { GroupedExpression } from './grouped-expression.interface';
import { isOperatorString } from './is-operator-string';
import { OperatorString } from './operator-string.type';

export function groupExpression(
  expressions: ExpressionArray
): GroupedExpression[] {
  const result: GroupedExpression[] = [];
  let operator: OperatorString = '+';
  let negative = false;

  for (const expression of expressions) {
    if (isOperatorString(expression)) {
      if (expression === '-' && operator !== '+') {
        negative = true;
      } else {
        operator = expression as OperatorString;
      }
    } else {
      let value: string | number | GroupedExpression[] | null = null;
      if (Array.isArray(expression)) {
        value = groupExpression(expression);
      } else if (/^\d+d\d+$/i.test(expression)) {
        value = expression;
      } else {
        const parsedValue = parseFloat(expression);
        if (!Number.isNaN(parsedValue)) {
          value = parsedValue;
        } else {
          throw new Error(`Unrecognized argument: ${expression}`);
        }
      }

      if (value !== null) {
        result.push({ operator, negative, value });
        negative = false;
        operator = '+';
      }
    }
  }

  return result;
}
