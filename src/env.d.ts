/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  /**
   * The current Sentry release, if any. Typically a git commit SHA.
   */
  readonly VITE_SENTRY_RELEASE: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
