import type { InjectionKey, Ref } from "vue";

export const tailwindEnabledKey = Symbol("tailwindEnabled") as InjectionKey<
  Ref<boolean>
>;
export const sentryKey = Symbol("sentry") as InjectionKey<
  typeof import("@sentry/vue")
>;
