<script setup lang="ts">
import { computed } from "vue";

import type { DateDiffForm, DateDiffOptions } from "@/use/date-diff-options";

const props = withDefaults(
  defineProps<{
    availableOptions: DateDiffOptions;
    presets?: readonly { id: string; name: string; options: DateDiffForm }[];
  }>(),
  { presets: () => [] },
);

const form = defineModel<DateDiffForm>({ required: true });
const presetId = defineModel<string>("presetId");

const preset = computed(
  () => props.presets.find((x) => x.id === presetId.value)?.options,
);

const resetToPreset = () => {
  if (preset.value == null) {
    return;
  }

  form.value = { ...preset.value };
};
</script>

<template>
  <form class="date-diff-options" @submit.prevent>
    <div v-if="presets.length > 0" class="presets">
      <label for="preset">Presets</label>
      <select id="preset" v-model="presetId">
        <option
          v-for="presetOption of presets"
          :key="presetOption.id"
          :value="presetOption.id"
        >
          {{ presetOption.name }}
        </option>
      </select>
      <button type="reset" @click.prevent="resetToPreset">Reset</button>
    </div>

    <fieldset class="fieldset">
      <legend>Spacing</legend>

      <div class="radio-group">
        <template
          v-for="spacingOption of availableOptions.spacing"
          :key="spacingOption.id"
        >
          <input
            :id="`spacing-${spacingOption.id}`"
            v-model="form.spacing"
            type="radio"
            :value="spacingOption.id"
          />
          <label
            :for="`spacing-${spacingOption.id}`"
            :class="{
              preset: spacingOption.id === preset?.spacing,
            }"
            >{{ spacingOption.label }}</label
          >
        </template>
      </div>

      <div class="comma-checkbox">
        <input
          id="comma-after-designator"
          v-model="form.commaAfterDesignator"
          type="checkbox"
        />
        <label for="comma-after-designator">Comma After Designator</label>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>Designator</legend>

      <div class="radio-group">
        <template
          v-for="designatorOption of availableOptions.designators"
          :key="designatorOption.id"
        >
          <input
            :id="`designator-${designatorOption.id}`"
            v-model="form.designator"
            type="radio"
            :value="designatorOption.id"
          />
          <label
            :for="`designator-${designatorOption.id}`"
            :class="{ preset: designatorOption.id === preset?.designator }"
            >{{ designatorOption.label }}</label
          >
        </template>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>Zero Unit</legend>

      <div class="radio-group">
        <template
          v-for="zeroUnitOption of availableOptions.zeroUnits"
          :key="zeroUnitOption.id"
        >
          <input
            :id="`zero-unit-${zeroUnitOption.id}`"
            v-model="form.zeroUnit"
            type="radio"
            :value="zeroUnitOption.id"
          />
          <label
            :for="`zero-unit-${zeroUnitOption.id}`"
            :class="{ preset: zeroUnitOption.id === preset?.zeroUnit }"
            >{{ zeroUnitOption.label }}</label
          >
        </template>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>Direction</legend>

      <div class="radio-group">
        <template
          v-for="directionOption of availableOptions.directions"
          :key="directionOption.id"
        >
          <input
            :id="`direction-${directionOption.id}`"
            v-model="form.direction"
            type="radio"
            :value="directionOption.id"
          />
          <label
            :for="`direction-${directionOption.id}`"
            :class="{ preset: directionOption.id === preset?.direction }"
            >{{ directionOption.label }}</label
          >
        </template>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>Fractional Units</legend>

      <div class="radio-group">
        <template
          v-for="fractionalUnitOption of availableOptions.fractionalUnits"
          :key="fractionalUnitOption.id"
        >
          <input
            :id="`fractional-unit-${fractionalUnitOption.id}`"
            v-model="form.fractionalUnit"
            type="radio"
            :value="fractionalUnitOption.id"
          />
          <label
            :for="`fractional-unit-${fractionalUnitOption.id}`"
            :class="{
              preset: fractionalUnitOption.id === preset?.fractionalUnit,
            }"
            >{{ fractionalUnitOption.label }}</label
          >
        </template>
      </div>

      <div class="hms-checkbox">
        <input
          id="hours-minutes-seconds"
          v-model="form.hoursMinutesSeconds"
          type="checkbox"
        />
        <label for="hours-minutes-seconds">Hours Minutes Seconds</label>

        <label for="padding">Padding</label>
        <input id="padding" v-model="form.padding" type="number" />
      </div>
    </fieldset>
  </form>
</template>

<style>
.date-diff-options {
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;

  .presets {
    display: grid;
    gap: 0.5rem;
    place-content: start;
  }

  .preset {
    color: salmon;
  }

  .fieldset {
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 1rem;
    align-content: start;
    align-items: baseline;
  }

  .radio-group {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    column-gap: 0.5rem;

    max-width: max-content;
  }

  .comma-checkbox,
  .hms-checkbox {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    gap: 1rem 0.5rem;
  }
}
</style>
