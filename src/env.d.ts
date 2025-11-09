/// <reference types="vite/client" />

/**
 * Set to `true` at build time after checking if code coverage has been
 * generated.
 */
declare const __PLAYGROUND_VUE_COVERAGE_EXISTS__: boolean;

/**
 * A list of all files inside the src/ directory.
 */
declare const __PLAYGROUND_VUE_FILES_LIST__: string[];

/**
 * Indicate that Tailwind is supported when building. Defaults to true.
 */
declare const __PLAYGROUND_VUE_TAILWIND_SUPPORTED__: boolean;

declare module "*.vue" {
  import type { Component } from "vue";
  const component: Component;
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
   * The Sentry environment associated with this build.
   *
   * @see https://docs.sentry.io/platforms/javascript/configuration/environments/
   * @see https://docs.sentry.io/product/sentry-basics/environments/
   */
  readonly VITE_SENTRY_ENVIRONMENT: "development" | "production" | undefined;

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

  /**
   * For identifying where the build came from, if possible.
   */
  readonly VITE_VERSION_STRING: string | undefined;

  /**
   * Identify when the build was created (RFC3339 in seconds precision), if possible.
   */
  readonly VITE_VERSION_DATE: string | undefined;

  /**
   * Start with Tailwind CSS enabled. Set to a truthy value to load the
   * Tailwind CSS styles.
   */
  readonly VITE_TAILWIND_ENABLED: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// HACK: TypeScript types don't support the `window.screen.orientation.lock`
// method:
// https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1615
interface ScreenOrientation extends EventTarget {
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock) */
  lock(orientation: OrientationType): Promise<void>;
}
