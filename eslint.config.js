import globals from "globals";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginPrettier from "eslint-config-prettier";
import { fileURLToPath, URL } from "url";

const resolve = (path) => fileURLToPath(new URL(path, import.meta.url));

const noUnusedVarsRule = [
  "warn",
  {
    vars: "all",
    args: "after-used",
    ignoreRestSiblings: false,
    argsIgnorePattern: "^_",
  },
];

export default tseslint.config(
  {
    files: ["*.js", "*.mjs", "*.cjs"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    extends: [eslint.configs.recommended, pluginPrettier],
    rules: {
      "no-unused-vars": noUnusedVarsRule,
    },
  },

  {
    files: ["*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ["**/*.ts", "**/*.vue"],
    ignores: ["dist/", "coverage/"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: [
          "./tsconfig.app.json",
          "./tsconfig.vite-config.json",
          "./tsconfig.vitest.json",
          "./tsconfig.workers.json",
        ],
      },
    },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          // Based on the default groups defined in
          // the docs:
          // https://github.com/lydell/eslint-plugin-simple-import-sort
          groups: [
            // Side effect imports.
            ["^\\u0000"],
            // Node.js builtins prefixed with `node:`.
            ["^node:"],
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ["^@?\\w"],
            // Custom group: Vue components.
            ["\\.vue\\u0000?$"],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ["^"],
            // Relative imports.
            // Anything that starts with a dot.
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },

  {
    files: ["**/*.ts", "**/*.vue"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.eslintRecommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...pluginVue.configs["flat/recommended"],
      pluginPrettier,
    ],

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          // Based on the default groups defined in
          // the docs:
          // https://github.com/lydell/eslint-plugin-simple-import-sort
          groups: [
            // Side effect imports.
            ["^\\u0000"],
            // Node.js builtins prefixed with `node:`.
            ["^node:"],
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ["^@?\\w"],
            // Custom group: Vue components.
            ["\\.vue\\u0000?$"],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ["^"],
            // Relative imports.
            // Anything that starts with a dot.
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",

      "@typescript-eslint/no-unused-vars": noUnusedVarsRule,
      "vue/block-order": [
        "error",
        {
          order: ["script:not([setup])", "script[setup]", "template", "style"],
        },
      ],
      "vue/component-api-style": ["error", ["script-setup"]],
      "vue/define-macros-order": "warn",
    },

    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: [
          "./tsconfig.app.json",
          "./tsconfig.vite-config.json",
          "./tsconfig.vitest.json",
          "./tsconfig.workers.json",
        ],
        extraFileExtensions: [".vue"],
        tsconfigRootDir: resolve("."),
      },

      globals: {
        PositionOptions: "readonly",
        GeolocationPosition: "readonly",
        GeolocationPositionError: "readonly",
        __PLAYGROUND_VUE_COVERAGE_EXISTS__: "readonly",
        __PLAYGROUND_VUE_FILES_LIST__: "readonly",
      },
    },
  },

  {
    ignores: ["dist/", "coverage/", "public/coverage/"],
  },
);
