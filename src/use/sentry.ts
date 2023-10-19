import type { App, Plugin } from "vue";
import { provide as vueProvide } from "vue";
import type { Router } from "vue-router";

import { sentryKey } from "@/injectionKeys";

export const sentryPlugin: Plugin = {
  async install(
    app: App,
    { router, provide = false }: { router: Router; provide: boolean },
  ) {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (!import.meta.env.VITE_SENTRY_ENABLED || dsn === undefined) {
      return;
    }

    try {
      const Sentry = await import("@sentry/vue");
      const { Wasm } = await import("@sentry/wasm");
      Sentry.init({
        app,
        dsn,
        environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
        replaysSessionSampleRate: 0, // If there's lots of traffic, set this to a lower value
        replaysOnErrorSampleRate: 1.0,
        tracePropagationTargets: [
          "localhost",
          "playground-vue.pages.dev",
          /^\//,
        ],
        integrations: [
          new Sentry.Replay(),
          new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          }),
          new Wasm(),
        ],
        tracesSampleRate: 1.0,
        release: import.meta.env.VITE_SENTRY_RELEASE,
        logErrors: true,
      });

      if (provide) {
        vueProvide(sentryKey, Sentry);
      }
    } catch {
      // Let ad-blockers do their thing without crashing the app
    }
  },
};
