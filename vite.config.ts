/// <reference types="vitest" />

import vue from "@vitejs/plugin-vue";
import fastGlob from "fast-glob";
import fs from "fs";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv, searchForWorkspaceRoot } from "vite";
import { configDefaults } from "vitest/config";

import vitePluginEruda from "./config/vite-plugin-eruda";
import trySentryVitePlugin from "./config/vite-plugin-sentry";
import { separateTailwind } from "./config/vite-plugin-separate-tailwind";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const cwd = resolve(".");
  const env = loadEnv(mode, cwd, "BUILDTIME_");

  const wasmSupported = (env.BUILDTIME_WASM_SUPPORTED ?? "true") === "true";
  const sunriseRoot = wasmSupported
    ? env.BUILDTIME_SUNRISE_CLI_ROOT ?? "../sunrise-cli"
    : "./src/fake/sunrise-cli";
  const isReproducible =
    (env.BUILDTIME_REPRODUCIBLE_ENABLED ?? "false") === "true";

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
      sourcemap: !isReproducible, // sourcemaps change on every build
      rollupOptions: {
        output: {
          // The Heroicons output can get quite large, so split these up into
          // smaller pieces.
          manualChunks: {
            "heroicons/20-solid": ["@heroicons/vue/20/solid"],
            "heroicons/24-outline": ["@heroicons/vue/24/outline"],
            "heroicons/24-solid": ["@heroicons/vue/24/solid"],
          },

          // https://rollupjs.org/guide/en/#outputentryfilenames
          entryFileNames: isReproducible
            ? "assets/[name].js"
            : "assets/[name]-[hash].js",

          // https://rollupjs.org/guide/en/#outputchunkfilenames
          chunkFileNames: isReproducible
            ? "assets/[name].js"
            : "assets/[name]-[hash].js",

          // https://rollupjs.org/guide/en/#outputassetfilenames
          assetFileNames({ name }) {
            const hash = isReproducible ? "" : "-[hash]";
            const asset = `[name]${hash}[extname]`;

            if (/\.(?:woff2?|[ot]tf)$/.test(name ?? "")) {
              return `assets/fonts/${asset}`;
            }

            return `assets/${asset}`;
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
        resolve("./public/coverage/index.html"),
      ),
      __PLAYGROUND_VUE_FILES_LIST__: fastGlob
        .sync("./src/**", { cwd })
        .map((x) => x.slice(1)),
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

      env.BUILDTIME_ERUDA_ENABLED ? vitePluginEruda() : false,

      trySentryVitePlugin(),
    ],
  };
});
