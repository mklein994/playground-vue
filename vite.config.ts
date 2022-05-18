/// <reference types="vitest" />

import vue from "@vitejs/plugin-vue";
import fs from "fs";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv, searchForWorkspaceRoot } from "vite";

import { separateTailwind } from "./config/vite-plugin-separate-tailwind";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const cwd = process.cwd();
  const env = loadEnv(mode, cwd, "BUILDTIME_");

  const sunriseRoot = env.BUILDTIME_SUNRISE_CLI_ROOT ?? "../sunrise-cli";

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
        // TODO: remove this once @types/node gets updated to support node 18
        external: ["node:test"],
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
        fileURLToPath(new URL("./public/coverage/index.html", import.meta.url))
      ),
      // HACK: Don't let tailwindcss/colors use process.env (since it's
      // node-only).
      //
      // See https://github.com/tailwindlabs/tailwindcss/blob/fc25299aa64c78e2e1863aff80a27d17c1bc1584/src/util/log.js#L6
      //
      // A value that is not undefined here silences the deprecation logs,
      // since the get() method is overridden for those colors.
      "process.env.JEST_WORKER_ID":
        mode === "development" ? "'some-defined-value'" : undefined,
    },
    resolve: {
      alias: {
        "@sunrise-cli": fileURLToPath(new URL(sunriseRoot, import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
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
      mode === "production" && separateTailwind(),
    ],
  };
});
