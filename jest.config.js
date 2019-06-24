module.exports = {
  transform: { '.*': '<rootDir>/node_modules/babel-jest' },
  collectCoverageFrom: ['src/lib/**/*.js', '!src/lib/**/*.test.js'],
  coverageReporters: ['json', 'lcov', 'text-summary'],
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    // '^@components(.*)$': '<rootDir>/app/components$1',
    // '^@containers(.*)$': '<rootDir>/app/containers$1',
    // '^@helpers(.*)$': '<rootDir>/app/helpers$1',
    // '^@utils(.*)$': '<rootDir>/app/utils$1',
    // '^@pages(.*)$': '<rootDir>/app/pages$1',
    // '^@images(.*)$': '<rootDir>/app/images$1',
    // '^@redux(.*)$': '<rootDir>/app/redux$1',
    // '^@settings(.*)$': '<rootDir>/app/settings$1',
    // '^@constants(.*)$': '<rootDir>/app/constants$1',
    '.*\\.(css|less|styl|scss|sass)$': 'identity-obj-proxy',
    // '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //   '<rootDir>/config/jest-mocks/image.js',
  },
  // setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
  testRegex: 'src/lib/tests/.*\\.test\\.js$',
};
