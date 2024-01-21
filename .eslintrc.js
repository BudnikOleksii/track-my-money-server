module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          'Object': {
            message: 'Avoid using the `Object` type. Did you mean `object`?',
          },
          'Function': {
            message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
          },
          'Boolean': {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
            fixWith: 'boolean',
          },
          'Number': {
            message: 'Avoid using the `Number` type. Did you mean `number`?',
            fixWith: 'number',
          },
          'Symbol': {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
            fixWith: 'symbol',
          },
          'String': {
            message: 'Avoid using the `String` type. Did you mean `string`?',
            fixWith: 'string',
          },
          '{}': {
            message: 'Use Record<K, V> instead',
            fixWith: 'Record<K, V>',
          },
          'object': {
            message: 'Use Record<K, V> instead',
            fixWith: 'Record<K, V>',
          },
        },
      },
    ],
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // types first
          ['^.*\\u0000$'],
          // node and side effect imports
          ['^node:', '^\\u0000'],
          // packages
          ['default', '^', '^@'],
          // other
          ['^[./]'],
        ],
      },
    ],
    'max-len': ['error', { code: 100, ignoreUrls: true }],
    'no-console': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/ignore': ['node_modules'],
  },
};
