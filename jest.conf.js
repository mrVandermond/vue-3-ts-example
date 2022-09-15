const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '.'),
  testURL: 'http://localhost:8000',
  testRunner: 'jest-jasmine2',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'vue',
    'json',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|sass)': '<rootDir>/test/mocks/styleMock.ts',
  },
  transform: {
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest',
    '^.*\\.(vue)$': '<rootDir>/node_modules/@vue/vue3-jest',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-html'],
  coverageDirectory: '<rootDir>/test/coverage',
  collectCoverageFrom: [
    'src/**/*.vue',
    'src/**/*.ts',
    '!src/api/*.ts',
    '!src/router/*.ts',
    '!src/types/*.ts',
    '!**/node_modules/**',
  ],
  coverageProvider: 'v8',
};
