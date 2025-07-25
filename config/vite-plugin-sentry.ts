import { sentryVitePlugin } from "@sentry/vite-plugin";
import type { Plugin } from "vite";

export default (): Plugin[] =>
  sentryVitePlugin({
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
  });
