import type { MaybeRefOrGetter } from "vue";
import { computed, ref } from "vue";

export type PitchName =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

export const useTuner = (referenceHz: MaybeRefOrGetter<number>) => {
  const pitchCents = ref<number>();
  const pitchName = ref<PitchName>();

  return {
    pitchCents: computed(() => pitchCents.value),
    pitchName: computed(() => pitchName.value),
  };
};
