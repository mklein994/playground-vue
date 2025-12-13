<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from "vue";

const box = useTemplateRef<HTMLDivElement>("box");
const width = ref(5);
const marginInlineEnd = ref("");

onMounted(() => {
  watch(
    width,
    () => {
      const style = getComputedStyle(box.value!);
      marginInlineEnd.value = style.getPropertyValue("margin-inline-end");
    },
    { immediate: true, flush: "post" },
  );
});
</script>

<template>
  <div class="slope-experiment">
    <div class="container">
      <div class="box-wrapper pv-inverse-clamp">
        <div ref="box" class="box"></div>
      </div>
    </div>

    <form class="settings" @submit.prevent>
      <pre>margin-inline-end: {{ marginInlineEnd }}</pre>

      <div class="input-wrapper">
        <label for="width-range">Width</label>
        <input
          id="width-range"
          v-model="width"
          type="range"
          min="3"
          max="15"
          step="any"
        />
      </div>

      <div class="input-wrapper">
        <label for="width-number">Width</label>
        <input
          id="width-number"
          v-model="width"
          type="number"
          min="3"
          max="15"
          step="any"
        />
      </div>
    </form>
  </div>
</template>

<style>
.slope-experiment {
  display: grid;
  padding: 1rem;
  gap: 1rem;
  place-content: center;
  place-items: center;

  .container {
    border: 1px solid
      light-dark(var(--pv-b-color-pink-500), var(--pv-b-color-pink-400));
    container: wrapper / inline-size;
    inline-size: calc(v-bind("width") * 1rem);
    margin-inline: auto;

    .box-wrapper {
      --pv-value-start: 0.75;
      --pv-value-end: 0;
      --pv-width-start: 8;
      --pv-width-end: 10;
      --pv-unit: 1rem;
      --pv-slope-factor: 100cqi;

      box-sizing: content-box;
      border: 1px solid
        light-dark(var(--pv-b-color-neutral-800), var(--pv-b-color-neutral-200));
      block-size: 5rem;
      container: box / inline-size;
      inline-size: clamp(
        min(100cqi, var(--pv-width-start) * var(--pv-unit)),
        80cqi,
        var(--pv-width-end) * var(--pv-unit)
      );
      margin-inline: auto;

      .box {
        background-color: var(--pv-b-color-green-500);
        block-size: 1rem;
        inline-size: 1rem;

        margin-inline: auto var(--pv-value);
      }
    }
  }

  .settings {
    display: grid;
    gap: 0.5rem;

    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
}
</style>
