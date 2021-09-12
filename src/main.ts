import "./fonts.css";
// import "modern-normalize/modern-normalize.css";
// import "./tailwind.css";
import "./style.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import { routes } from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
