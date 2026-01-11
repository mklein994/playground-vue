import type { MaybeRefOrGetter } from "vue";
import { computed, toValue } from "vue";

export const notes = [
  "C",
  "C♮",
  "D",
  "D♮",
  "E",
  "F",
  "F♮",
  "G",
  "G♮",
  "A",
  "A♮",
  "B",
] as const;

export type NoteName = (typeof notes)[number];

export const usePitch = (
  frequency: MaybeRefOrGetter<number>,
  referenceHz: MaybeRefOrGetter<number>,
) => {
  const midiNumber = computed(
    () => 12 * Math.log2(toValue(frequency) / toValue(referenceHz)) + 69,
  );
  const rounded = computed(() => Math.round(midiNumber.value));

  const name = computed(() => notes[rounded.value % 12]);
  const cents = computed(() => midiNumber.value - rounded.value);
  const octave = computed(() => Math.floor(rounded.value / 12) - 1);

  return {
    cents,
    octave,
    name,
  };
};
