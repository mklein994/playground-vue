import { onBeforeMount, ref, watch } from "vue";

export type UnitSystem = "metric" | "imperial";
export type RulerOrientation = "portrait" | "landscape";

export interface RulerOptions {
  screenSizeInches: number;
  rulerUnit: UnitSystem;
  rulerOrientation: RulerOrientation;
  usePadding: boolean;
}

export const useRulerOptions = () => {
  const defaults: RulerOptions = {
    screenSizeInches: 25,
    rulerUnit: "metric",
    rulerOrientation: window.screen.orientation.type.startsWith("portrait")
      ? "portrait"
      : "landscape",
    usePadding: false,
  };

  const screenSizeInches = ref(defaults.screenSizeInches);
  const rulerUnit = ref<UnitSystem>(defaults.rulerUnit);
  const rulerOrientation = ref<RulerOrientation>(defaults.rulerOrientation);
  const usePadding = ref(defaults.usePadding);

  onBeforeMount(() => {
    const rulerOptionsText = localStorage.getItem("pvRulerOptions");
    const rulerOptions =
      rulerOptionsText == null
        ? defaults
        : {
            ...defaults,
            ...(JSON.parse(rulerOptionsText) as Partial<RulerOptions>),
          };

    screenSizeInches.value = rulerOptions.screenSizeInches;
    rulerUnit.value = rulerOptions.rulerUnit;
    rulerOrientation.value = rulerOptions.rulerOrientation;
    usePadding.value = rulerOptions.usePadding;

    watch(
      [screenSizeInches, rulerUnit, rulerOrientation, usePadding],
      ([newSize, newRulerUnit, newRulerOrientstion, newUsePadding]) => {
        const newOptions: RulerOptions = {
          screenSizeInches: newSize,
          rulerUnit: newRulerUnit,
          rulerOrientation: newRulerOrientstion,
          usePadding: newUsePadding,
        };
        localStorage.setItem("pvRulerOptions", JSON.stringify(newOptions));
      },
    );
  });

  return {
    screenSizeInches,
    rulerUnit,
    rulerOrientation,
    usePadding,
  };
};
