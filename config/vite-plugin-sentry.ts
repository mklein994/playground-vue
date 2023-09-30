import type { Plugin } from "vite";

export default async (): Promise<Plugin | false> => {
  if (!process.env.VITE_SENTRY_ENABLED) {
    return false;
  }

  try {
    const sentryPlugin = await import("@sentry/vite-plugin");
    return sentryPlugin.sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: {
        deploy: {
          env: process.env.VITE_SENTRY_ENVIRONMENT ?? "development",
        },
        setCommits: {
          auto: true,
        },
      },
    }) as unknown as Plugin;
  } catch {
    return false;
  }
};
