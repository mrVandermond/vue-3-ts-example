module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    '@vue/typescript/recommended',
  ],
  plugins: [
    'vue',
    'import',
  ],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  env: {
    'vue/setup-compiler-macros': true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: './webpack.conf.js'
      }
    }
  },
  overrides: [
    {
      files: ['./test/**/*.ts'],
      rules: {
        'vue/one-component-per-file': 'off',
      },
    }
  ],
  rules: {
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
    }],
    'import/prefer-default-export': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'error',

    'no-spaced-func': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    'object-curly-newline': ['error', {
      ImportDeclaration: {
        minProperties: 6,
      },
      ObjectExpression: {
        consistent: true,
      },
      ObjectPattern: {
        consistent: true,
      }
    }],

    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/array-type': ['error', {
      default: 'array-simple',
      readonly: 'array-simple',
    }],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
    '@typescript-eslint/consistent-type-assertions': ['error', {
      assertionStyle: 'as',
    }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/method-signature-style': ['error', 'method'],
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/restrict-template-expressions': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/type-annotation-spacing': ['error', {
      before: false,
      after: false,
      overrides: {
        colon: {
          before: false,
          after: true,
        },
        arrow: {
          before: true,
          after: true,
        },
        parameter: {
          before: false,
          after: true,
        },
        property: {
          before: false,
          after: true,
        },
        returnType: {
          before: false,
          after: true,
        },
      },
    }],

    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error', {
      before: false,
      after: true,
    }],
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'init-declarations': 'off',
    '@typescript-eslint/init-declarations': 'off',
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', {
      before: true,
      after: true,
    }],
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error', {
      includeExports: true,
    }],
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': ['error'],
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': 'error',
    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': 'error',
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'error',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always', {
      arraysInObjects: true,
      objectsInObjects: false,
    }],
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': ['error',
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any',    prev: 'import', next: 'import' },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var', 'export'] },
      { blankLine: 'always', prev: ['const', 'let', 'var', 'export'], next: '*' },
      { blankLine: 'any',    prev: ['const', 'let', 'var', 'export'], next: ['const', 'let', 'var', 'export'] },
      { blankLine: 'always', prev: '*', next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'] },
      { blankLine: 'always', prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['interface', 'type'] },
      { blankLine: 'always', prev: ['interface', 'type'], next: '*' },
      { blankLine: 'any', prev: 'type', next: 'type' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single', {
      avoidEscape: false,
      allowTemplateLiterals: true,
    }],
    'require-await': 'off',
    '@typescript-eslint/require-await': 'error',
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error', 'never'],
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always', {
      omitLastInOneLineBlock: false,
    }],
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      "asyncArrow": "always"
    }],
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': 'error',
  },
}
