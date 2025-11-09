import { ref, watch } from "vue";

export type UnitSystem = "metric" | "imperial";
export type RulerOrientation = "portrait" | "landscape";

export interface RulerOptions {
  screenSizeInches: number;
  rulerUnit: UnitSystem;
  rulerOrientation: RulerOrientation;
  usePadding: boolean;
  imperialMajorTickCount: number;
  metricMajorTickCount: number;
}

const isValidRulerOptions = (
  o: unknown,
  defaults: RulerOptions,
): o is RulerOptions => {
  if (!(typeof o === "object" && o)) {
    return false;
  }

  if (!new Set(Object.keys(o)).isSubsetOf(new Set(Object.keys(defaults)))) {
    return false;
  }

  let valid = true;
  for (const [key, value] of Object.entries(o)) {
    if (key === "screenSizeInches" && typeof value !== "number") {
      valid = false;
      break;
    }

    if (
      key === "rulerUnit"
      && (typeof value !== "string" || !["metric", "imperial"].includes(value))
    ) {
      valid = false;
      break;
    }

    if (
      key === "rulerOrientation"
      && (typeof value !== "string"
        || !["portrait", "landscape"].includes(value))
    ) {
      valid = false;
      break;
    }

    if (key === "usePadding" && typeof value !== "boolean") {
      valid = false;
      break;
    }

    if (
      ["imperialMajorTickCount", "metricMajorTickCount"].includes(key)
      && !(Number.isSafeInteger(value) && value >= 0)
    ) {
      valid = false;
      break;
    }
  }

  if (!valid) {
    console.warn("Invalid settings stored, resetting to defaults");
  }

  return valid;
};

export const useRulerOptions = () => {
  const storageKey = "pvRulerOptions";

  const defaults: RulerOptions = {
    screenSizeInches: 25,
    rulerUnit: "metric",
    rulerOrientation: window.screen.orientation.type.startsWith("portrait")
      ? "portrait"
      : "landscape",
    usePadding: false,
    imperialMajorTickCount: 12,
    metricMajorTickCount: 30,
  };

  const loadOptions = () => {
    const rulerOptionsText = localStorage.getItem(storageKey);
    if (rulerOptionsText == null) {
      return defaults;
    }

    const newOptions = JSON.parse(rulerOptionsText) as unknown;
    if (!isValidRulerOptions(newOptions, defaults)) {
      localStorage.setItem(storageKey, JSON.stringify(defaults));
      return defaults;
    }

    return {
      ...defaults,
      ...newOptions,
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

  const resetOptions = <T extends keyof RulerOptions>(optionKeys: T[]) => {
    for (const option of optionKeys) {
      rulerOptions.value[option] = defaults[option];
    }
  };

  return {
    rulerOptions,
    resetOptions,
  };
};
