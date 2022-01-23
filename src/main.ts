import "./fonts.css";
// import "modern-normalize/modern-normalize.css";
// import "./tailwind.css";
import "./style.css";

import { Integrations } from "@sentry/tracing";
import { Wasm as WasmIntegration } from "@sentry/wasm";
import * as Sentry from "@sentry/vue";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import { routes } from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://931d497682d84de1ad9db23083a1a6c0@o1124115.ingest.sentry.io/6162360",
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "playground-vue.pages.dev", /^\//],
    }),
    new WasmIntegration(),
  ],
  tracesSampleRate: 1.0,
  release: import.meta.env.VITE_SENTRY_RELEASE,
});

app.use(router).mount("#app");
