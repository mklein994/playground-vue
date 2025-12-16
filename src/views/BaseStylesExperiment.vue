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

      <div class="button-wrapper">
        <span>Normal</span>
        <button type="button" class="default">Button</button>
      </div>

      <div class="button-wrapper">
        <span>Disabled</span>
        <button type="button" disabled class="default">Button</button>
      </div>

      <div class="button-wrapper">
        <span>Normal Styled</span>
        <button type="button" class="pv-button">Button</button>
      </div>

      <div class="button-wrapper">
        <span>Disabled Styled</span>
        <button type="button" disabled class="pv-button">Button</button>
      </div>
    </fieldset>

    <fieldset class="input-group">
      <legend>Inputs</legend>

      <label for="input-normal">Input</label>
      <input id="input-normal" value="test" type="text" class="default" />

      <label for="input-normal-disabled">Input Disabled</label>
      <input
        id="input-normal-disabled"
        value="test"
        type="text"
        disabled
        class="default"
      />

      <label for="input-styled">Input Styled</label>
      <input id="input-styled" value="test" type="text" class="pv-input" />

      <label for="input-styled-disabled">Input Styled Disabled</label>
      <input
        id="input-styled-disabled"
        value="test"
        type="text"
        disabled
        class="pv-input"
      />
    </fieldset>
  </div>
</template>

<style>
.base-styles-experiment {
  display: grid;
  padding: 1rem;
  gap: 2rem;
  justify-items: start;

  .button-group {
    display: grid;
    gap: 1rem;

    .button-wrapper {
      display: inline-block;
      button {
        margin-inline-start: 0.5rem;
      }
    }
  }

  .input-group {
    display: grid;
    gap: 0.5rem 0.25rem;
    grid-template-columns: auto auto;
  }

  .default {
    all: revert;
  }
}
</style>
