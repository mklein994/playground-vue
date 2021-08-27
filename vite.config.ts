import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import postcssDirPseudoClass from "postcss-dir-pseudo-class";
import postcssLogical from "postcss-logical";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
        postcssLogical({ preserve: true }),
        postcssDirPseudoClass,
      ],
    },
  },
  server: {
    fs: {
      // TODO: this setting is experimental. Once
      // stabilized, it's expected that this will be
      // `true`, at which point it can be removed.
      strict: true,
    },
    host: "127.0.0.1",
  },
  plugins: [vue()],
});
