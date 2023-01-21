module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['no-relative-import-paths'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: ['../.eslintrc.base.json'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      {
        allowSameFolder: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.e2e-spec.ts'],
      rules: {
        'no-relative-import-paths/no-relative-import-paths': ['off'],
      },
    },
  ],
};
