import vue from "@vitejs/plugin-vue";
import {
  defineConfig,
  IndexHtmlTransformResult,
  searchForWorkspaceRoot,
} from "vite";
import viteSentry, { ViteSentryPluginOptions } from "vite-plugin-sentry";

const separateTailwind = () => ({
  name: "html-tailwind-transform",
  transformIndexHtml(): IndexHtmlTransformResult {
    return [
      {
        tag: "link",
        attrs: {
          href: `/tailwind.min.css?t=${new Date().valueOf()}`,
          rel: "stylesheet",
          title: "tailwind",
          disabled: "",
        },
        injectTo: "head",
      },
    ];
  },
});

const sentryConfig: ViteSentryPluginOptions = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  sourceMaps: {
    include: ["./dist/assets"],
    ignore: ["node_modules"],
    urlPrefix: "~/assets",
  },
  deploy: {
    env: "production",
  },
  setCommits: {
    auto: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), "../sunrise-cli"],
    },
    host: "127.0.0.1",
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
    mode === "production" && separateTailwind(),
    mode === "production" && process.env.ENABLE_SENTRY && viteSentry(sentryConfig),
  ],
}));
