<script setup lang="ts">
import { computed } from "vue";

import { useResetCss } from "@/use/use-reset-css";

const { toggleReset, resetActive } = useResetCss(false);
const resetButtonText = computed(() =>
  resetActive.value ? "Disable Reset" : "Enable Reset",
);
</script>

<template>
  <div class="base-styles-experiment">
    <button type="button" class="default" @click="toggleReset">
      {{ resetButtonText }}
    </button>

    <fieldset class="button-group">
      <legend>Buttons</legend>

      <button type="button" class="default">Normal Button</button>

      <button type="button" disabled class="default">Disabled Button</button>

      <button type="button" class="pv-button">Normal Styled Button</button>

      <button type="button" disabled class="pv-button">
        Disabled Styled Button
      </button>
    </fieldset>

    <fieldset class="input-group">
      <legend>Inputs</legend>

      <div class="pv-input-wrapper">
        <label for="input-normal">Input</label>
        <input id="input-normal" value="test" type="text" class="default" />
      </div>

      <div class="pv-input-wrapper">
        <label for="input-normal-disabled">Input Disabled</label>
        <input
          id="input-normal-disabled"
          value="test"
          type="text"
          disabled
          class="default"
        />
      </div>

      <div class="pv-input-wrapper">
        <label for="input-tw">Tailwind</label>
        <input id="input-tw" value="test" type="text" class="tw:form-input" />
      </div>

      <div class="pv-input-wrapper">
        <label for="input-tw-disabled">Tailwind Disabled</label>
        <input
          id="input-tw-disabled"
          value="test"
          type="text"
          disabled
          class="tw:form-input"
        />
      </div>

      <div class="pv-input-wrapper">
        <label for="input-styled">Input Styled</label>
        <input id="input-styled" value="test" type="text" class="pv-input" />
      </div>

      <div class="pv-input-wrapper">
        <label for="input-styled-disabled">Input Styled Disabled</label>
        <input
          id="input-styled-disabled"
          value="test"
          type="text"
          disabled
          class="pv-input"
        />
      </div>
    </fieldset>
  </div>
</template>

<style>
.base-styles-experiment {
  display: grid;
  gap: 2rem;
  justify-items: start;
  padding: 1rem;

  .button-group {
    display: grid;
    gap: 1rem;
    justify-items: start;
  }

  .input-group {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem 1rem;
  }

  .default {
    all: revert;
  }
}
</style>
