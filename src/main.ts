import "@/fonts.css";
// import "modern-normalize/modern-normalize.css";
// import "@/tailwind.css";
import "@/style.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "@/App.vue";

import { sentryPlugin } from "@/plugins/sentry";
import { routes } from "@/routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const app = createApp(App);

void (async () => {
  try {
    const analyticsImports = await import("@/plugins/analytics");
    app.use(sentryPlugin, { router, analyticsImports });
  } catch (error: unknown) {
    console.warn(new Error("Failed to initialize Sentry", { cause: error }));
  }

  app.use(router).mount("#app");
})();
