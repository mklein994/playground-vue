import { ref, watch } from "vue";

export type UnitSystem = "metric" | "imperial";
export type RulerOrientation = "portrait" | "landscape";

export interface RulerOptions {
  screenSizeInches: number;
  rulerUnit: UnitSystem;
  rulerOrientation: RulerOrientation;
  usePadding: boolean;
}

export const useRulerOptions = () => {
  const storageKey = "pvRulerOptions";

  const defaults: RulerOptions = {
    screenSizeInches: 25,
    rulerUnit: "metric",
    rulerOrientation: window.screen.orientation.type.startsWith("portrait")
      ? "portrait"
      : "landscape",
    usePadding: false,
  };

  const loadOptions = () => {
    const rulerOptionsText = localStorage.getItem(storageKey);
    return rulerOptionsText == null
      ? defaults
      : {
          ...defaults,
          ...(JSON.parse(rulerOptionsText) as Partial<RulerOptions>),
        };
  };

  const rulerOptions = ref(loadOptions());

  watch(
    rulerOptions,
    (newOptions) => {
      localStorage.setItem(storageKey, JSON.stringify(newOptions));
    },
    { deep: true },
  );

  return {
    rulerOptions,
  };
};
