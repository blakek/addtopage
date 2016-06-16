module.exports = {
  extends: ['eslint:recommended'],

  parser: 'babel-eslint',

  env: {
    browser: true,
    es6: true
  },

  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },

  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    strict: 0,
    quotes: ['error', 'single']
  }
}
