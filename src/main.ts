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

if (import.meta.env.VITE_SENTRY_ENABLED) {
  app.use(sentryPlugin, { router });
}
app.use(router).mount("#app");
