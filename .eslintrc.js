module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/standard'
  ],  
  env: {
    browser: true,
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [4, { 'x-invalid-end-tag': false }],
    'no-undef': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    // "indent": ["error", 4], tab为4个空格
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
