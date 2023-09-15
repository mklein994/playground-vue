import "@/fonts.css";
// import "modern-normalize/modern-normalize.css";
// import "@/tailwind.css";
import "@/style.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "@/App.vue";

import { routes } from "@/routes";
import { sentry } from "@/use/sentry";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const app = createApp(App);

app.use(sentry, { router });

app.use(router).mount("#app");
