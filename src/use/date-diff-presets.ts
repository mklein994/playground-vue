import { computed, ref } from "vue";

import type { DateDiffForm } from "./date-diff-options";

export const useDateDiffPresets = () => {
  const presetId = ref<(typeof presets.value)[number]["id"]>("verbose");

  const presets = computed(
    () =>
      [
        {
          id: "verbose",
          name: "Verbose",
          options: {
            spacing: "between-units-and-designators",
            designator: "verbose",
            commaAfterDesignator: true,
            fractionalUnit: "",
            hoursMinutesSeconds: false,
            direction: "auto",
            padding: 0,
            zeroUnit: "second",
          },
        },

        {
          id: "short",
          name: "Short",
          options: {
            spacing: "between-units-and-designators",
            commaAfterDesignator: true,
            designator: "short",
            hoursMinutesSeconds: false,
            fractionalUnit: "",
            direction: "auto",
            padding: 0,
            zeroUnit: "second",
          },
        },

        {
          id: "compact",
          name: "Compact",
          options: {
            spacing: "none",
            designator: "compact",
            commaAfterDesignator: false,
            fractionalUnit: "",
            hoursMinutesSeconds: true,
            direction: "auto",
            padding: 2,
            zeroUnit: "second",
          },
        },
      ] as const satisfies readonly {
        id: string;
        name: string;
        options: DateDiffForm;
      }[],
  );

  const currentPreset = computed(() =>
    presets.value.find((x) => x.id === presetId.value),
  );

  return {
    presetId,
    presets,
    currentPreset,
  };
};
