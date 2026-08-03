module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: ['react-refresh'],
  rules: {
    // Enforce React Refresh fast-refresh compatibility
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Code quality
    'no-console':          'error',
    'no-debugger':         'error',
    'no-unused-vars':      ['error', { argsIgnorePattern: '^_' }],
    'no-duplicate-imports': 'error',

    // React rules
    'react/prop-types':          'off',   // We rely on Zod + JSDoc for typing
    'react/display-name':        'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/self-closing-comp':   'warn',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
  },
};
