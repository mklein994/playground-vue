import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
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
