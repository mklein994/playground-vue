// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
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
  ignorePatterns: ["dist/"],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    defineDefaults: "readonly",
    withDefaults: "readonly",
    PositionOptions: "readonly",
    GeolocationPosition: "readonly",
    GeolocationPositionError: "readonly",
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
    "vue/component-api-style": ["error", ["script-setup", "composition"]],
  },
};
