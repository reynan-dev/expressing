module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "no-param-reassign": "off",
    "class-methods-use-this": "off",
    "lines-between-class-members": "off",
    "linebreak-style": "off",
    "no-underscore-dangle": "off",
    "consistent-return": "warn",
    "no-restricted-syntax": "off",
    "no-tabs": "off",
  },
};
