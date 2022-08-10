/// <reference types="vite/client" />

/**
 * Set to `true` at build time after checking if code coverage has been
 * generated.
 */
declare const __PLAYGROUND_VUE_COVERAGE_EXISTS__: boolean;

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  /**
   * Whether Sentry should be enabled or not. A truthy
   * value evaluates to true. Defaults to false.
   */
  readonly VITE_SENTRY_ENABLED: string | undefined;

  /**
   * The current Sentry release, if any. Typically a git commit SHA.
   *
   * @see https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/#release
   * @see https://docs.sentry.io/product/releases/
   */
  readonly VITE_SENTRY_RELEASE: string | undefined;

  /**
   * The **D**ata **S**ource **N**ame.
   *
   * @see https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/#dsn
   * @see https://docs.sentry.io/product/sentry-basics/dsn-explainer/
   */
  readonly VITE_SENTRY_DSN: string | undefined;

  /**
   * The commit hash of this build, if available.
   */
  readonly VITE_COMMIT_HASH: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
