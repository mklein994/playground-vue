<script setup lang="ts">
import { ref } from "vue";

const cssVariables = ref<HTMLDivElement>();

const updateColor = (event: Event) => {
  const newColor = (event.target as HTMLInputElement).value;

  const cssVariablesEl =
    cssVariables.value
    ?? (() => {
      throw new Error(".css-variables is undefined");
    })();

  cssVariablesEl.style.setProperty("--color", newColor);
};
</script>

<template>
  <div ref="cssVariables" class="css-variables">
    <p class="text">
      Habeatur disciplina, quam gravis, quam continens, quam severa sit. Non
      enim hanc solam sequimur, quae suavitate aliqua naturam ipsam movet et cum
      iucunditate quadam percipitur sensibus, sed maximam voluptatem illam.
    </p>
    <input
      type="text"
      name="color"
      class="tw:form-input"
      @input="updateColor"
    />
    <input
      type="color"
      name="color-input"
      class="tw:form-input"
      @change="updateColor"
    />
  </div>
</template>

<style>
.css-variables {
  --color: tomato;

  .text {
    color: var(--color);
  }
}
</style>
