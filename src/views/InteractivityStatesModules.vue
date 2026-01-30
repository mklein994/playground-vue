<script setup lang="ts">
import { ref } from "vue";

const message = ref<string>();

const handleClick = (event: Event) => {
  const target = event.target as HTMLButtonElement;
  message.value = `clicked: ${target.textContent}`;
};

const fruits = [
  { name: "Apple", value: "apple" },
  { name: "Banana", value: "banana" },
  { name: "Cherry", value: "cherry" },
];
</script>

<template>
  <div :class="$style.interactivityStates">
    <div :class="$style.buttonGroups">
      <div :class="$style.buttonGroup">
        <button
          type="button"
          :class="[$style.button, $style.firstButton]"
          @click="handleClick"
        >
          First Button
        </button>
        <button
          type="button"
          :class="[$style.button, $style.secondButton]"
          @click="handleClick"
        >
          Second Button
        </button>
      </div>

      <div :class="$style.buttonGroup">
        <button
          type="button"
          :class="[$style.button, $style.firstButton, $style.custom]"
          @click="handleClick"
        >
          First Custom Button
        </button>
        <button
          type="button"
          :class="[$style.button, $style.secondButton, $style.custom]"
          @click="handleClick"
        >
          Second Custom Button
        </button>
      </div>
      <output>{{ message }}</output>
    </div>

    <div :class="$style.textGroups">
      <div :class="$style.textGroup">
        <label for="first-text">First Text</label>
        <input
          id="first-text"
          type="text"
          :class="[$style.text, $style.firstText]"
        />

        <label for="second-text">Second Text</label>
        <input
          id="second-text"
          type="text"
          :class="[$style.text, $style.secondText]"
        />
      </div>

      <div :class="$style.textGroup">
        <label for="first-custom-text">First Custom Text</label>
        <input
          id="first-custom-text"
          type="text"
          :class="[$style.text, $style.firstText, $style.custom]"
        />

        <label for="second-custom-text">Second Custom Text</label>
        <input
          id="second-custom-text"
          type="text"
          :class="[$style.text, $style.secondText, $style.custom]"
        />
      </div>
    </div>

    <div :class="$style.radioGroups">
      <div :class="$style.radioGroup">
        <template v-for="fruit of fruits" :key="fruit.name">
          <label :for="`${fruit.name}-${fruit.value}`">{{ fruit.name }}</label>
          <input
            :id="`${fruit.name}-${fruit.value}`"
            type="radio"
            name="fruit"
            :value="fruit.value"
            :class="$style.radio"
          />
        </template>
      </div>

      <div :class="$style.radioGroup">
        <template v-for="fruit of fruits" :key="fruit.name">
          <label :for="`${fruit.name}-${fruit.value}-custom`"
            >Custom {{ fruit.name }}</label
          >
          <input
            :id="`${fruit.name}-${fruit.value}-custom`"
            type="radio"
            name="fruit-custom"
            :value="fruit.value"
            :class="[$style.radio, $style.custom]"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style module>
.interactivityStates {
  display: grid;
  gap: 1em;
  padding: 1em;
}

.buttonGroups {
  display: grid;
  gap: 1em;
}

.buttonGroup {
  display: flex;
  gap: 1em;
}

.textGroups {
  display: grid;
  gap: 1em;
  justify-content: start;
}

.textGroup {
  display: grid;
  grid: auto-flow / repeat(2, 1fr);
  gap: 1em;
}

.radioGroups {
  display: grid;
}

.radioGroup {
  display: grid;
  grid: auto-flow / repeat(2, auto);
  column-gap: 1em;
  align-items: baseline;
  justify-content: start;
}

.custom {
  appearance: none;
}

.radio.custom {
  --size: 0.85rem;
  --ratio: 0.5;

  /*
  These colors come from inspecting Firefox defaults with the color picker.
  */
  --default-color: #8f8f9d;
  --hover-color: #676774;
  --active-color: #484851;

  --checked-default-color: #3584e4;
  --checked-hover-color: #1e6fc5;
  --checked-active-color: #0059a8;

  display: grid;
  align-items: center;
  justify-content: center;

  inline-size: var(--size);
  block-size: var(--size);
  margin: 3px 3px 0 5px;
  padding: 0 2px;
  border: 2px solid var(--default-color);
  border-radius: 50%;

  &::after {
    content: "";
    inline-size: calc(var(--size) * var(--ratio));
    block-size: calc(var(--size) * var(--ratio));
  }

  &:hover {
    border-color: var(--hover-color);
  }

  &:active {
    border-color: var(--active-color);
  }

  &:focus {
    outline: 2px solid lightskyblue;
    outline-offset: 1px;
  }

  &:checked {
    border-color: var(--checked-default-color);

    &::after {
      border-radius: inherit;
      background-color: var(--checked-default-color);
    }

    &:hover {
      border-color: var(--checked-hover-color);

      &::after {
        background-color: var(--checked-hover-color);
      }
    }

    &:active {
      border-color: var(--checked-active-color);

      &::after {
        background-color: var(--checked-active-color);
      }
    }
  }

  /* Support browsers that don't support :focus-visible */
  &:focus:not(:focus-visible) {
    outline: unset;
    outline-offset: unset;
  }
}
</style>
