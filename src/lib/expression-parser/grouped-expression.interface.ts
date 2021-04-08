import { OperatorString } from './operator-string.type';

export interface GroupedExpression {
  operator: OperatorString;
  value: string | number | GroupedExpression[];
  negative: boolean;
}
