// @ts-check

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  extends: [
    // basic
    '@mizdra/mizdra',
    '@mizdra/mizdra/+typescript',
    '@mizdra/mizdra/+prettier',
  ],
  env: {
    node: true,
  },
  rules: {
    'prettier/prettier': 0,
    'import/no-extraneous-dependencies': 2,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json', './example/tsconfig.json'],
      },
    },
  ],
};
