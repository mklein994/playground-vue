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
        Integrations,
        sentryInit,
        vueRouterInstrumentation,
        WasmIntegration,
      } = await import("@/use/analytics");

      sentryInit({
        app,
        dsn,
        integrations: [
          new Integrations.BrowserTracing({
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
