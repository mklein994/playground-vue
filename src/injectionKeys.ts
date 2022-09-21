import type { InjectionKey, Ref } from "vue";
import { inject } from "vue";

export const tailwindEnabledKey = Symbol("tailwindEnabled") as InjectionKey<
  Ref<boolean>
>;

export const injectStrict = <T>(key: InjectionKey<T>): T => inject(key) as T;
