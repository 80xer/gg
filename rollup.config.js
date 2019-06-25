import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

export default [
  {
    input: 'src/lib/js/index.js',
    output: {
      name: 'gg',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      scss({
        output: 'dist/gg.css',
      }),
      babel(),
    ],
  },

  {
    input: 'src/lib/js/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      scss({
        output: 'dist/gg.css',
      }),
      babel(),
    ],
  },

  {
    input: 'src/demo/index.js',
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      scss({
        output: 'demo/index.css',
      }),
      babel(),
    ],
    output: {
      file: 'demo/index.js',
      format: 'iife',
      name: 'demo',
      moduleName: 'demo',
      sourceMap: true,
    },
  },
];
