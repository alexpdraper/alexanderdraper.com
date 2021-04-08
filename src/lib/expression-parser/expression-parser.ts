import { pipe } from '../pipe';
import { evaluateExpression } from './evaluate-expressions';
import { groupExpression } from './group-expression';
import { parseParens } from './parse-parens';
import { splitByOperator } from './split-by-operator';

export const expressionParser = pipe(
  parseParens,
  splitByOperator,
  groupExpression,
  evaluateExpression
);
