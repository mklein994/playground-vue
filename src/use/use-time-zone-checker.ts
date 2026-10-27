import { type MaybeRefOrGetter, ref, toValue, watch } from "vue";

import {
  DateTimeZoneChecker,
  TemporalTimeZoneChecker,
  type TimeZoneChecker,
} from "@/helpers/TimeZoneChecker";

export const useTimeZoneChecker = (
  implementation: MaybeRefOrGetter<"temporal" | "date">,
) => {
  const checker = ref<TimeZoneChecker>();
  watch(
    () => toValue(implementation),
    (impl) => {
      switch (impl) {
        case "temporal":
          checker.value = new TemporalTimeZoneChecker();
          break;
        case "date":
          checker.value = new DateTimeZoneChecker();
          break;
        default:
          throw new Error("Unknown implementation passed");
      }
    },
    { immediate: true },
  );

  return {
    checker,
  };
};
