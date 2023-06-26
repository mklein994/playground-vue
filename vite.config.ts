/// <reference types="vitest" />

import { sentryVitePlugin } from "@sentry/vite-plugin";
import vue from "@vitejs/plugin-vue";
import fs from "fs";
import { fileURLToPath, URL } from "url";
import {
  type BuildOptions,
  defineConfig,
  loadEnv,
  searchForWorkspaceRoot,
} from "vite";
import { configDefaults } from "vitest/config";

import { separateTailwind } from "./config/vite-plugin-separate-tailwind";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const cwd = process.cwd();
  const env = loadEnv(mode, cwd, "BUILDTIME_");

  const wasmSupported = (env.BUILDTIME_WASM_SUPPORTED ?? "true") === "true";
  const sunriseRoot = wasmSupported
    ? env.BUILDTIME_SUNRISE_CLI_ROOT ?? "../sunrise-cli"
    : "./src/fake/sunrise-cli";
  const isReproducible =
    (env.BUILDTIME_REPRODUCIBLE_ENABLED ?? "false") === "true";

  const rollupOutputs: NonNullable<BuildOptions["rollupOptions"]>["output"] =
    isReproducible
      ? {
          // https://rollupjs.org/guide/en/#outputassetfilenames
          assetFileNames: "assets/[name][extname]",

          // https://rollupjs.org/guide/en/#outputentryfilenames
          entryFileNames: "assets/[name].js",

          // https://rollupjs.org/guide/en/#outputchunkfilenames
          chunkFileNames: "assets/[name].js",
        }
      : {
          // Defaults when not set:
          // assetFileNames: "assets/[name].[hash][extname]",
          // entryFileNames: "assets/[name].[hash].js",
          // chunkFileNames: "assets/[name].[hash].js",
        };

  const tailwindPlugin = () =>
    mode === "production"
      ? isReproducible
        ? separateTailwind(new Date(2000, 0, 1))
        : separateTailwind()
      : false;

  return {
    server: {
      fs: {
        allow: [searchForWorkspaceRoot(cwd), sunriseRoot],
      },
      host: env.BUILDTIME_HOST,
    },

    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          ...rollupOutputs,

          // The Heroicons output can get quite large, so split these up into
          // smaller pieces.
          manualChunks: {
            "heroicons/20-solid": ["@heroicons/vue/20/solid"],
            "heroicons/24-outline": ["@heroicons/vue/24/outline"],
            "heroicons/24-solid": ["@heroicons/vue/24/solid"],
          },
        },
      },
    },

    test: {
      environment: "happy-dom",
      includeSource: ["./src/**/*.ts"],
      exclude: [...configDefaults.exclude, "**/*.node-test.*"],
      isolate: false, // major speed improvement at risk of cross-contamination
      snapshotFormat: {
        printBasicPrototype: true,
      },
      coverage: {
        reporter: ["html-spa", "text"],
        reportsDirectory: "public/coverage",
      },
    },

    define: {
      __VUE_OPTIONS_API__: false,
      "import.meta.vitest": "undefined",
      __PLAYGROUND_VUE_COVERAGE_EXISTS__: fs.existsSync(
        resolve("./public/coverage/index.html")
      ),
    },

    resolve: {
      alias: {
        "@sunrise-cli": resolve(sunriseRoot),
        "@": resolve("./src"),
      },
    },

    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.includes("-"),
          },
        },
      }),

      tailwindPlugin(),

      process.env.VITE_SENTRY_ENABLED
        ? sentryVitePlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
            release: {
              deploy: {
                env: process.env.VITE_SENTRY_ENVIRONMENT ?? "development",
              },
            },
          })
        : false,
    ],
  };
});
