export const operatorStrings = ['+', '-', '*', '/'] as const;

export type OperatorString = typeof operatorStrings[number];
