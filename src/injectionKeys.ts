import type { InjectionKey, Ref } from "vue";

import type { Sentry } from "@/use/sentry";

export const tailwindEnabledKey = Symbol("tailwindEnabled") as InjectionKey<
  Ref<boolean>
>;
export const sentryKey = Symbol("sentry") as InjectionKey<Sentry>;
