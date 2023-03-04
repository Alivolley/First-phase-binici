module.exports = {
  root: true,
  extends: ['@fullstacksjs'],
  settings: {
    'import/resolver': {
      typescript: {
        project: ['jsconfig.json'],
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-use-before-define': 'off',
    'fp/no-let': 'off',
    'no-unused-vars': 'off',
    'max-lines-per-function': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
