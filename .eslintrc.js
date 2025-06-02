module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['simple-import-sort'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-native/sort-styles': 'off',
    'object-curly-spacing': ['error', 'always'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'sort-imports': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 'latest',
  },
};
