import * as Sentry from "@sentry/vue";
import { wasmIntegration } from "@sentry/wasm";
import type { Plugin } from "vue";
import type { Router } from "vue-router";

interface SentryPluginOptions {
  router: Router;
}

export const sentryPlugin: Plugin<SentryPluginOptions> = {
  install(app, { router }) {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (dsn === undefined) {
      return;
    }

    Sentry.init({
      app,
      dsn,
      environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
      replaysSessionSampleRate: 0, // If there's lots of traffic, set this to a lower value
      replaysOnErrorSampleRate: 1.0,
      tracePropagationTargets: ["localhost", "playground-vue.pages.dev", /^\//],
      integrations: [
        Sentry.vueIntegration(),
        Sentry.replayIntegration(),
        Sentry.browserTracingIntegration({ router }),
        wasmIntegration(),
      ],
      tracesSampleRate: 1.0,
      release: import.meta.env.VITE_SENTRY_RELEASE,
    });
  },
};
