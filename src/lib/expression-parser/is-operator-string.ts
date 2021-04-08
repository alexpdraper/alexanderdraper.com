import { operatorStrings } from './operator-string.type';

export function isOperatorString(value: string | any): boolean {
  if (typeof value !== 'string') return false;
  for (const operatorString of operatorStrings) {
    if (value === operatorString) return true;
  }

  return false;
}
