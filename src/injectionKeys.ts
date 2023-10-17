import type { InjectionKey, Ref } from "vue";

export const tailwindEnabledKey = Symbol("tailwindEnabled") as InjectionKey<
  Ref<boolean>
>;
