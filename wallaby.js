/* eslint-disable func-names */
module.exports = function(wallaby) {
  return {
    files: [
      './src/**/*.js',
      { pattern: 'src/**/*.js', instrument: true, load: true, ignore: false },
    ],

    tests: ['./src/**/tests/**/*.test.js'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',
    debug: true,
    setup() {
      const jestConfig = require('./package.json').jest;
      // for example:
      jestConfig.globals = { __DEV__: true };
      wallaby.testFramework.configure(jestConfig);
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
  };
};
