import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: "127.0.0.1" },
  css: { postcss: { plugins: [autoprefixer()] } },
  plugins: [vue()],
});
