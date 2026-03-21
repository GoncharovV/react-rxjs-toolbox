import { eslintConfig, eslintConfigReact } from '@goncharovv/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintConfig,
  ...eslintConfigReact,

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@stylistic/padding-line-between-statements': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/display-name': 'off',
    },
  },

  {
    ignores: ['.docusaurus'],
  },

  {
    files: ['*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },

  {
    files: ['src/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: 'react-rxjs-toolbox',
          message: 'Self import is not allowed.',
        },
      ],
    },
  },
];
