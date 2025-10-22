/// <reference types="vitest" />

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import fastGlob from "fast-glob";
import fs from "fs";
import { Features } from "lightningcss";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv, searchForWorkspaceRoot } from "vite";
import wasm from "vite-plugin-wasm";
import { configDefaults } from "vitest/config";

import vitePluginEruda from "./config/vite-plugin-eruda";
import { vitePluginGoogleFonts } from "./config/vite-plugin-google-fonts";
import sentryVitePlugin from "./config/vite-plugin-sentry";
import { separateTailwind } from "./config/vite-plugin-separate-tailwind";
import { wasmProject } from "./config/vite-plugin-wasm-project";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
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

  const tailwindPlugin = () => {
    if (command === "serve") {
      return mode === "production" ? false : tailwindcss();
    }
    return isReproducible
      ? separateTailwind(Date.parse("2000-01-01"))
      : separateTailwind();
  };

  return {
    server: {
      fs: {
        allow: [searchForWorkspaceRoot(cwd)],
      },
      host: env.BUILDTIME_HOST,
    },

    css: {
      transformer: "lightningcss",
      lightningcss: {
        exclude: Features.OklabColors | Features.LightDark,
      },
    },

    build: {
      // The default, "modules", doesn't include top-level await, necessary for wasm support
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

      cssMinify: "lightningcss",
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

      vitePluginGoogleFonts([
        {
          fonts: {
            family: "Material Symbols Outlined",
            specs: {
              opsz: "20..40",
              wght: "100..700",
              FILL: "0..1",
              GRAD: "-50..200",
            },
          },
          display: "block",
        },

        {
          fonts: {
            family: "Honk",
            specs: {
              MORF: "0..45",
              SHLN: "0..100",
            },
            text: "Welcome",
          },
          display: "block",
        },
      ]),
    ],
  };
});
