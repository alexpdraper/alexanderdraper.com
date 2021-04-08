import { ExpressionArray } from './expression-array.interface';

export function parseParens(expr: string) {
  let currentArr: ExpressionArray = [];
  const chunkArrs: ExpressionArray[] = [currentArr];
  let chunk = '';

  const arr = expr.split('');
  while (arr.length) {
    const [char] = arr.splice(0, 1);

    if (char === '(') {
      if (chunk) currentArr.push(chunk);
      chunk = '';
      const nextArr: ExpressionArray = [];
      chunkArrs.push(nextArr);
      currentArr.push(nextArr);
      currentArr = nextArr;
    } else if (char === ')') {
      if (chunkArrs.length > 1) {
        if (chunk) currentArr.push(chunk);
        chunk = '';
        chunkArrs.splice(chunkArrs.length - 1, 1);
        currentArr = chunkArrs[chunkArrs.length - 1];
      }
    } else {
      chunk += char;
    }
  }
  if (chunk) currentArr.push(chunk);

  return chunkArrs[0];
}
