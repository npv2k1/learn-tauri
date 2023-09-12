/** @type {import('prettier')} */
module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  plugins: [require('prettier-plugin-tailwindcss')],
};
