import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/main.ts',
  output: [
    {
      dir: './site/assets',
      format: 'iife',
    },
  ],
  plugins: [
    resolve(),
    postcss({
      extract: true,
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          terser({
            keep_classnames: /^[A-Z].+Element$/,
            keep_fnames: /^[A-Z].+Element$/,
          }),
        ]
      : []),
  ],
};
