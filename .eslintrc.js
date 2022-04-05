// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2022: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "simple-import-sort"],
  ignorePatterns: ["dist/", "coverage/"],
  globals: {
    PositionOptions: "readonly",
    GeolocationPosition: "readonly",
    GeolocationPositionError: "readonly",
    __PLAYGROUND_VUE_COVERAGE_EXISTS__: "readonly",
  },
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "vue/script-setup-uses-vars": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_",
      },
    ],
    "vue/component-tags-order": [
      "error",
      { order: ["script", "template", "style"] },
    ],
    "vue/component-api-style": ["error", ["script-setup"]],
  },
};
