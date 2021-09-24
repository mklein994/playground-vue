import vue from "@vitejs/plugin-vue";
import { defineConfig, IndexHtmlTransformResult } from "vite";

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
export default defineConfig(({ mode }) => ({
  server: {
    fs: {
      // TODO: this setting is experimental. Once
      // stabilized, it's expected that this will be
      // `true`, at which point it can be removed.
      strict: true,
    },
    host: "127.0.0.1",
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
}));
