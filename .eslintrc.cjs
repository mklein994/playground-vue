const noUnusedVarsRule = [
  "warn",
  {
    vars: "all",
    args: "after-used",
    ignoreRestSiblings: false,
    argsIgnorePattern: "^_",
  },
];

const baseJsConfig = {
  env: {
    node: true,
    es2024: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["simple-import-sort"],
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-unused-vars": noUnusedVarsRule,
  },
};

module.exports = {
  root: true,

  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
  },

  ignorePatterns: ["dist/", "coverage/"],

  overrides: [
    {
      files: ["**/*.ts", "**/*.vue"],
      env: {
        browser: true,
        es2024: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-recommended",
        "prettier",
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": noUnusedVarsRule,
        "vue/component-tags-order": [
          "error",
          { order: ["script", "template", "style"] },
        ],
        "vue/component-api-style": ["error", ["script-setup"]],
        "vue/define-macros-order": "warn",
      },
      plugins: ["vue", "@typescript-eslint", "simple-import-sort"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: {
        PositionOptions: "readonly",
        GeolocationPosition: "readonly",
        GeolocationPositionError: "readonly",
        __PLAYGROUND_VUE_COVERAGE_EXISTS__: "readonly",
        __PLAYGROUND_VUE_FILES_LIST__: "readonly",
      },
    },

    // CommonJS files
    {
      ...baseJsConfig,
      files: ["**/*.cjs"],
    },

    {
      ...baseJsConfig,
      files: ["./public/**/*.cjs"],
      env: {
        browser: true,
      },
    },

    // ES6 JavaScript
    {
      ...baseJsConfig,
      files: ["*.js", "./src/**/*.js"],
      parserOptions: {
        ...baseJsConfig.parserOptions,
        sourceType: "module",
      },
    },
  ],
};
