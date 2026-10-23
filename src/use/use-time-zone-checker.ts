import { type MaybeRefOrGetter, ref, toValue, watch } from "vue";

import {
  DateTimeZoneChecker,
  TemporalTimeZoneChecker,
  type TimeZoneChecker,
} from "@/helpers/TimeZoneChecker";

export const useTimeZoneChecker = (
  override: MaybeRefOrGetter<"temporal" | "date" | undefined> = undefined,
) => {
  const checker = ref<TimeZoneChecker>();
  watch(
    () => toValue(override),
    (override) => {
      switch (override) {
        case "temporal":
          checker.value = new TemporalTimeZoneChecker();
          break;
        case "date":
          checker.value = new DateTimeZoneChecker();
          break;
        default:
          checker.value =
            typeof Temporal === "undefined"
              ? new DateTimeZoneChecker()
              : new TemporalTimeZoneChecker();
          break;
      }
    },
    { immediate: true },
  );

  return {
    checker,
  };
};
