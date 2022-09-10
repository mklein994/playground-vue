/// <reference types="vitest" />

import vue from "@vitejs/plugin-vue";
import fs from "fs";
import { fileURLToPath, URL } from "url";
import {
  type BuildOptions,
  defineConfig,
  loadEnv,
  searchForWorkspaceRoot,
} from "vite";

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

  const reproducibleBuild = mode.startsWith("repro");

  const rollupOutputs: NonNullable<BuildOptions["rollupOptions"]>["output"] =
    reproducibleBuild
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

  const tailwindPlugin = () => {
    if (mode === "production") {
      return separateTailwind();
    } else if (reproducibleBuild) {
      return separateTailwind(new Date(2000, 0, 1));
    } else {
      return false;
    }
  };

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
        output: rollupOutputs,
      },
    },

    test: {
      environment: "happy-dom",
      includeSource: ["./src/**/*.ts"],
      exclude: ["**/*.node-test.*"],
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
    ],
  };
});
