/// <reference types="vitest" />

import vue from "@vitejs/plugin-vue";
import fastGlob from "fast-glob";
import fs from "fs";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv, searchForWorkspaceRoot } from "vite";
import wasm from "vite-plugin-wasm";
import { configDefaults } from "vitest/config";

import vitePluginEruda from "./config/vite-plugin-eruda";
import sentryVitePlugin from "./config/vite-plugin-sentry";
import { separateTailwind } from "./config/vite-plugin-separate-tailwind";
import { wasmProject } from "./config/vite-plugin-wasm-project";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const cwd = resolve(".");
  const env = loadEnv(mode, cwd, "BUILDTIME_");

  const wasmSupported = (env.BUILDTIME_WASM_SUPPORTED ?? "true") === "true";
  const sunriseRoot = wasmSupported
    ? (env.BUILDTIME_SUNRISE_CLI_ROOT ?? "../sunrise-cli")
    : "./src/fake/sunrise-cli";
  const dateDiffRoot = wasmSupported
    ? (env.BUILDTIME_DATE_DIFF_ROOT ?? "../date-diff")
    : "./src/fake/date-diff";
  const isReproducible =
    (env.BUILDTIME_REPRODUCIBLE_ENABLED ?? "false") === "true";
  const lowMemory = (env.BUILDTIME_LOW_MEMORY ?? "false") === "true";
  const tailwindSupported =
    (env.BUILDTIME_TAILWIND_SUPPORTED ?? "true") === "true";

  const tailwindPlugin = () =>
    mode === "production"
      ? isReproducible
        ? separateTailwind(Date.parse("2000-01-01"))
        : separateTailwind()
      : false;

  return {
    server: {
      fs: {
        allow: [searchForWorkspaceRoot(cwd)],
      },
      host: env.BUILDTIME_HOST,
    },

    build: {
      // The default, "modules", doesn't include top-level await, necessary for wasm support
      target: [
        "es2022", // es2020
        "edge89", // edge88
        "firefox89", // firefox78
        "chrome89", // chrome87
        "safari15", // safari14
      ],
      sourcemap: !lowMemory && !isReproducible, // sourcemaps change on every build
      rollupOptions: {
        output: {
          // https://rollupjs.org/guide/en/#outputentryfilenames
          entryFileNames: isReproducible
            ? "assets/[name].js"
            : "assets/[name]-[hash].js",

          // https://rollupjs.org/guide/en/#outputchunkfilenames
          chunkFileNames: isReproducible
            ? "assets/[name].js"
            : "assets/[name]-[hash].js",

          // https://rollupjs.org/guide/en/#outputassetfilenames
          assetFileNames({ names }) {
            const hash = isReproducible ? "" : "-[hash]";
            const asset = `[name]${hash}[extname]`;

            if (names?.some((name) => /\.(?:woff2?|[ot]tf)$/.test(name))) {
              return `assets/fonts/${asset}`;
            }

            return `assets/${asset}`;
          },
        },
      },
    },

    test: {
      environment: "happy-dom",
      includeSource: ["./src/**/*.ts", "./config/**/*.ts"],
      exclude: [...configDefaults.exclude, "**/*.node-test.*"],
      poolOptions: {
        forks: {
          isolate: false, // major speed improvement at risk of cross-contamination
        },
      },
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
      __PLAYGROUND_VUE_TAILWIND_SUPPORTED__: tailwindSupported,
    },

    worker: {
      format: "es",
    },

    resolve: {
      alias: {
        "@": resolve("./src"),
        "tailwindcss/colors": resolve("./src/tokens/vendor/tailwind.ts"),
      },
    },

    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.includes("-") || tag === "search",
          },
        },
      }),
      tailwindSupported ? tailwindPlugin() : false,
      wasm(),
      wasmProject(wasmSupported, sunriseRoot, {
        "@sunrise-cli": resolve(sunriseRoot),
      }),
      wasmProject(wasmSupported, dateDiffRoot, {
        "@date-diff": resolve(dateDiffRoot),
      }),
      env.BUILDTIME_ERUDA_ENABLED ? vitePluginEruda() : false,
      env.BUILDTIME_SENTRY_ENABLED ? sentryVitePlugin() : false,
    ],
  };
});
