import type { App, Plugin } from "vue";
import type { Router } from "vue-router";

export const sentry: Plugin = {
  async install(app: App, { router }: { router: Router }) {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (!import.meta.env.VITE_SENTRY_ENABLED || dsn === undefined) {
      return;
    }

    try {
      const {
        SentryBrowserTracing,
        SentryReplay,
        WasmIntegration,
        sentryInit,
        vueRouterInstrumentation,
      } = await import("@/use/analytics");

      sentryInit({
        app,
        dsn,
        environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
        replaysSessionSampleRate: 1.0, // If there's lots of traffic, set this to a lower value
        replaysOnErrorSampleRate: 1.0,
        integrations: [
          new SentryReplay(),
          new SentryBrowserTracing({
            routingInstrumentation: vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "playground-vue.pages.dev", /^\//],
          }),
          new WasmIntegration(),
        ],
        tracesSampleRate: 1.0,
        release: import.meta.env.VITE_SENTRY_RELEASE,
        logErrors: true,
      });
    } catch {
      // Let ad-blockers do their thing without crashing the app
    }
  },
};
