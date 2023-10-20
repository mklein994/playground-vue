import type { BrowserOptions } from "@sentry/vue";
import type { App, Plugin } from "vue";
import type { Router } from "vue-router";

import { sentryKey } from "@/injectionKeys";

type Flatten<T> = T extends Array<infer U> ? U : never;
type Integration = Flatten<BrowserOptions["integrations"]>;
type AnalyticsImports = typeof import("@/use/analytics");
type SentryImport = AnalyticsImports["Sentry"];

let Sentry: SentryImport;
export type Sentry = typeof Sentry;

// See https://docs.sentry.io/platforms/javascript/troubleshooting/#using-the-javascript-proxy-api
const handler: ProxyHandler<object> = {
  get: function (_, key) {
    return new Proxy(function (cb: (sentry: Sentry) => unknown) {
      if (key === "flush" || key === "close") {
        return Promise.resolve();
      }

      if (typeof cb === "function") {
        return cb(Sentry);
      }

      return Sentry;
    }, handler);
  },
};

interface SentryPluginParams {
  router: Router;
  analyticsImports: Partial<AnalyticsImports>;
}

export const sentryPlugin: Plugin<SentryPluginParams> = {
  install(app: App, { router, analyticsImports }) {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (
      !import.meta.env.VITE_SENTRY_ENABLED ||
      dsn === undefined ||
      analyticsImports.Sentry === undefined
    ) {
      Sentry = new Proxy({}, handler) as SentryImport;
      app.provide(sentryKey, Sentry);
      return;
    }

    Sentry = analyticsImports.Sentry;

    Sentry.init({
      app,
      dsn,
      environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
      replaysSessionSampleRate: 0, // If there's lots of traffic, set this to a lower value
      replaysOnErrorSampleRate: 1.0,
      tracePropagationTargets: ["localhost", "playground-vue.pages.dev", /^\//],
      integrations: (integrations) => {
        const customIntegrations: Integration[] = [
          new Sentry.Replay(),
          new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          }),
        ];
        if (analyticsImports.Wasm !== undefined) {
          customIntegrations.push(new analyticsImports.Wasm());
        }
        return integrations.concat(customIntegrations);
      },
      tracesSampleRate: 1.0,
      release: import.meta.env.VITE_SENTRY_RELEASE,
      logErrors: true,
    });

    app.provide(sentryKey, Sentry);
  },
};
