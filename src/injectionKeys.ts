import type { InjectionKey, Ref } from "vue";
import { inject } from "vue";

export const tailwindEnabledKey = Symbol("tailwindEnabled") as InjectionKey<
  Ref<boolean>
>;

export function injectStrict<T>(key: InjectionKey<T>): T {
  return inject(key) as T;
}
