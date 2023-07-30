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
  <div class="tw-grid tw-gap-1 tw-p-1">
    <div class="tw-grid tw-gap-1">
      <div class="tw-flex tw-gap-1">
        <button type="button" @click="handleClick">First Button</button>
        <button type="button" @click="handleClick">Second Button</button>
      </div>

      <div class="tw-flex tw-gap-1">
        <button type="button" class="tw-appearance-none" @click="handleClick">
          First Custom Button
        </button>
        <button type="button" class="tw-appearance-none" @click="handleClick">
          Second Custom Button
        </button>
      </div>
      <output>{{ message }}</output>
    </div>

    <div class="tw-grid tw-justify-start">
      <div class="tw-grid tw-gap-1 tw-grid-flow-col tw-grid-cols-2">
        <label for="first-text">First Text</label>
        <input id="first-text" type="text" />

        <label for="second-text">Second Text</label>
        <input id="second-text" type="text" />
      </div>

      <div class="tw-grid tw-gap-1 tw-grid-flow-col tw-grid-cols-2">
        <label for="first-custom-text">First Custom Text</label>
        <input id="first-custom-text" type="text" class="tw-appearance-none" />

        <label for="second-custom-text">Second Custom Text</label>
        <input id="second-custom-text" type="text" class="tw-appearance-none" />
      </div>
    </div>

    <div class="tw-grid">
      <div
        class="tw-grid tw-items-baseline tw-justify-start tw-gap-x-1 tw-grid-cols-[repeat(2,_auto)]"
      >
        <template v-for="fruit of fruits" :key="fruit.name">
          <label :for="`${fruit.name}-${fruit.value}`">{{ fruit.name }}</label>
          <input
            :id="`${fruit.name}-${fruit.value}`"
            type="radio"
            name="fruit"
            :value="fruit.value"
          />
        </template>
      </div>

      <div
        class="tw-grid tw-items-baseline tw-justify-start tw-gap-x-1 tw-grid-cols-[repeat(2,_auto)]"
      >
        <template v-for="fruit of fruits" :key="fruit.name">
          <label :for="`${fruit.name}-${fruit.value}-custom`"
            >Custom {{ fruit.name }}</label
          >
          <input
            :id="`${fruit.name}-${fruit.value}-custom`"
            type="radio"
            name="fruit-custom"
            :value="fruit.value"
            :class="[
              'tw-appearance-none',
              'tw-grid',
              'tw-items-center',
              'tw-justify-center',
              'tw-px-[2px]',
              'tw-border-[2px]',
              'tw-border-[#8f8f9d]',
              'tw-border-solid',
              'tw-rounded-full',
              'tw-mt-[3px]',
              'tw-mr-[3px]',
              'tw-mb-0',
              'tw-ml-[5px]',
              'tw-w-[0.85rem]',
              'tw-h-[0.85rem]',
              'after:tw-w-[calc(0.85rem_*_0.5)]',
              'after:tw-h-[calc(0.85rem_*_0.5)]',
              'hover:tw-border-[#676774]',
              'active:tw-border-[#484851]',
              'focus:tw-outline',
              'focus:tw-outline-2',
              'focus:tw-outline-offset-1',
              'focus:tw-outline-[lightskyblue]',
              'checked:tw-border-[#3584e4]',
              'focus:[&:not(:focus-visible)]:tw-outline-0',
              'checked:hover:tw-border-[#1e6fc5]',
              'checked:active:tw-border-[#0059a8]',
              'after:checked:tw-rounded-[inherit]',
              'after:checked:tw-bg-[#3584e4]',
              'after:checked:hover:tw-bg-[#1e6fc5]',
              'after:checked:active:tw-bg-[#0059a8]',
            ]"
          />
        </template>
      </div>
    </div>
  </div>
</template>
