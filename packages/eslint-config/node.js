import baseConfig from './index.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
];

