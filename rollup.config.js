import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';

export default {
  input: './src/gg.js',
  output: [
    {
      file: 'dist/gg.js',
      format: 'esm'
    }
  ],
  moduleFileExtensions: ['js', 'scss'],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    scss({
      output: 'dist/gg.css'
    })
  ]
};
