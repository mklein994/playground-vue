import "./fonts.css";
// import "modern-normalize/modern-normalize.css";
// import "./tailwind.css";
import "./style.css";

import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";
import { Wasm as WasmIntegration } from "@sentry/wasm";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import { routes } from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const app = createApp(App);

const dsn = import.meta.env.VITE_SENTRY_DSN;
if (dsn !== undefined) {
  Sentry.init({
    app,
    dsn,
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
}

app.use(router).mount("#app");
