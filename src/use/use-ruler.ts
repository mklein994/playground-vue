import {
  computed,
  type MaybeRefOrGetter,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  toValue,
} from "vue";

import type { RulerOptions } from "./use-ruler-options";

export const useRuler = (options: MaybeRefOrGetter<RulerOptions>) => {
  const width = ref(window.screen.width);
  const height = ref(window.screen.height);

  const handleResize = () => {
    width.value = window.screen.width;
    height.value = window.screen.height;
  };

  onBeforeMount(() => {
    window.addEventListener("resize", handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });

  const diagonalInches = computed(() => toValue(options).screenSizeInches);

  const diagonalPixels = computed(() =>
    Math.sqrt(width.value ** 2 + height.value ** 2),
  );

  const widthInches = computed(
    () => (diagonalInches.value / diagonalPixels.value) * width.value,
  );
  const heightInches = computed(
    () => (diagonalInches.value / diagonalPixels.value) * height.value,
  );

  const majorTickCount = computed(() => {
    const opts = toValue(options);

    const lengthInches =
      opts.rulerOrientation === "portrait" ? heightInches : widthInches;

    if (opts.rulerUnit === "imperial") {
      return Math.ceil(lengthInches.value);
    } else {
      return Math.ceil(lengthInches.value * 2.54);
    }
  });

  return {
    majorTickCount,
    isLarge: computed(() =>
      toValue(options).rulerUnit === "metric"
        ? majorTickCount.value > 50
        : majorTickCount.value > 12 * 3,
    ),
  };
};
