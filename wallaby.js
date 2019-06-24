/* eslint-disable func-names */
module.exports = function(wallaby) {
  return {
    files: [
      './src/lib/**/*.js',
      './src/demo/sampleProps.js',
      '!./src/lib/tests/**/*.test.js',
      'jest.config.js',
      'test-setup.js',
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
      const jestConfig = require('./jest.config');
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
