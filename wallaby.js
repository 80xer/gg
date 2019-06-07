/* eslint-disable func-names */
module.exports = function(wallaby) {
  return {
    files: [
      './src/lib/**/*.js',
      '!./src/lib/tests/**/*.test.js',
      {
        pattern: './src/lib/**/*.js',
        instrument: true,
        load: true,
        ignore: false,
      },
    ],

    tests: ['./src/lib/tests/**/*.test.js'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',
    debug: true,
    setup() {
      const jestConfig = require('./package.json').jest;
      // for example:
      // jestConfig.globals = { __DEV__: true };
      Object.keys(jestConfig).forEach(conf =>
        Object.keys(jestConfig[conf]).forEach(
          k =>
            (jestConfig[conf][k] = jestConfig[conf][k].replace(
              '<rootDir>',
              wallaby.localProjectDir
            ))
        )
      );
      wallaby.testFramework.configure(jestConfig);
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
  };
};
