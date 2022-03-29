/// <reference types="vitest" />

import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import {
  type IndexHtmlTransformResult,
  defineConfig,
  loadEnv,
  searchForWorkspaceRoot,
} from "vite";

const separateTailwind = () => ({
  name: "html-tailwind-transform",
  transformIndexHtml(): IndexHtmlTransformResult {
    return [
      {
        tag: "link",
        attrs: {
          href: `/tailwind.min.css?t=${new Date().valueOf()}`,
          rel: "stylesheet",
          title: "tailwind",
          disabled: "",
        },
        injectTo: "head",
      },
    ];
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const cwd = process.cwd();
  const env = loadEnv(mode, cwd, "BUILDTIME_");

  const sunriseRoot = env["BUILDTIME_SUNRISE_CLI_ROOT"] ?? "../sunrise-cli";

  return {
    server: {
      fs: {
        allow: [searchForWorkspaceRoot(cwd), sunriseRoot],
      },
      host: env["BUILDTIME_HOST"],
    },
    build: {
      sourcemap: true,
    },
    test: {
      environment: "happy-dom",
      includeSource: ["./src/**/*.ts"],
    },
    define: {
      "import.meta.vitest": "undefined",
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
