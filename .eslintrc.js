module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'no-undef': 'off',
  },
  parser: '@typescript-eslint/parser',
};
