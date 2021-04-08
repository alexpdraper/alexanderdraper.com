type PipeFn<A, B> = (arg: A) => B;

function pipe<A>(): (input: A) => A;
function pipe<A, B>(op1: PipeFn<A, B>): (input: A) => B;
function pipe<A, B, C>(op1: PipeFn<A, B>, op2: PipeFn<B, C>): (input: A) => C;
function pipe<A, B, C, D>(
  op1: PipeFn<A, B>,
  op2: PipeFn<B, C>,
  op3: PipeFn<C, D>
): (input: A) => D;
function pipe<A, B, C, D, E>(
  op1: PipeFn<A, B>,
  op2: PipeFn<B, C>,
  op3: PipeFn<C, D>,
  op4: PipeFn<D, E>
): (input: A) => E;
function pipe<A, B, C, D, E, F>(
  op1: PipeFn<A, B>,
  op2: PipeFn<B, C>,
  op3: PipeFn<C, D>,
  op4: PipeFn<D, E>,
  op5: PipeFn<E, F>
): (input: A) => F;
function pipe<A, B, C, D, E, F, G>(
  op1: PipeFn<A, B>,
  op2: PipeFn<B, C>,
  op3: PipeFn<C, D>,
  op4: PipeFn<D, E>,
  op5: PipeFn<E, F>,
  op6: PipeFn<F, G>
): (input: A) => G;
function pipe<A, B, C, D, E, F, G>(
  op1: PipeFn<A, B>,
  op2: PipeFn<B, C>,
  op3: PipeFn<C, D>,
  op4: PipeFn<D, E>,
  op5: PipeFn<E, F>,
  op6: PipeFn<F, G>,
  ...operators: ((input: any) => any)[]
): (input: A) => any;
function pipe(...operators: ((arg: any) => any)[]): (input: any) => any {
  return (input) => {
    let output = input;
    for (const operator of operators) {
      output = operator(output);
    }
    return output;
  };
}

export { pipe };
