import vue from "@vitejs/plugin-vue";
import {
  defineConfig,
  IndexHtmlTransformResult,
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
export default defineConfig(({ mode }) => ({
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), "../sunrise-cli"],
    },
    host: "127.0.0.1",
  },
  build: {
    sourcemap: true,
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
