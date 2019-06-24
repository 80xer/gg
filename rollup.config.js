import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import css from 'rollup-plugin-css-only';
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
      css(),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      sass({
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
      css(),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      sass({
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
      sass({
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
