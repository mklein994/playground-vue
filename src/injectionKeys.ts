import type { ComputedRef, InjectionKey, Ref } from "vue";

export const tailwindEnabledKey = Symbol("tailwindEnabled") as InjectionKey<
  Ref<boolean>
>;

export const schemeKey = Symbol("schemeKey") as InjectionKey<
  Ref<"light" | "dark" | "os-default">
>;

export const resolvedSchemeKey = Symbol("resolvedSchemeKey") as InjectionKey<
  ComputedRef<"light" | "dark">
>;
