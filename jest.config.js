// @ts-check
'use strict';

module.exports = ((/** @type {import('ts-jest').JestConfigWithTsJest} */ e) => e)({
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: './tests/tsconfig.json',
    },
  },
});
