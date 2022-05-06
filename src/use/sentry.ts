import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";
import { Wasm as WasmIntegration } from "@sentry/wasm";
import type { App } from "vue";
import type { Router } from "vue-router";

export const sentry = {
  install: (app: App, { router }: { router: Router }) => {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (!!import.meta.env.VITE_SENTRY_ENABLED || dsn === undefined) {
      return;
    }

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
  },
};
