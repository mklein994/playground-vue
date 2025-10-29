/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-tailwindcss",
    "stylelint-config-idiomatic-order",
    "stylelint-config-recommended-vue",
  ],
  overrides: [
    {
      files: ["**/*.vue", "*.vue", "**/*.css", "*.css"],
      ignoreFiles: "**/reset.css",
      rules: {
        "function-no-unknown": [
          true,
          {
            ignoreFunctions: ["v-bind", "theme"],
          },
        ],
        "declaration-property-value-no-unknown": [
          true,
          {
            ignoreProperties: {
              "/.*/": "/(?:v-bind|theme)\\(.+\\)/",
            },
          },
        ],
        "at-rule-no-unknown": [
          true,
          {
            ignoreAtRules: ["custom-variant", "plugin", "reference"],
          },
        ],
      },
    },
  ],
};
