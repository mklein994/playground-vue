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
  <div class="tw:grid tw:gap-1 tw:p-1">
    <div class="tw:grid tw:gap-1">
      <div class="tw:flex tw:gap-1">
        <button type="button" @click="handleClick">First Button</button>
        <button type="button" @click="handleClick">Second Button</button>
      </div>

      <div class="tw:flex tw:gap-1">
        <button type="button" class="tw:appearance-none" @click="handleClick">
          First Custom Button
        </button>
        <button type="button" class="tw:appearance-none" @click="handleClick">
          Second Custom Button
        </button>
      </div>
      <output>{{ message }}</output>
    </div>

    <div class="tw:grid tw:justify-start">
      <div class="tw:grid tw:gap-1 tw:grid-flow-col tw:grid-cols-2">
        <label for="first-text">First Text</label>
        <input id="first-text" type="text" class="tw:form-input" />

        <label for="second-text">Second Text</label>
        <input id="second-text" type="text" class="tw:form-input" />
      </div>

      <div class="tw:grid tw:gap-1 tw:grid-flow-col tw:grid-cols-2">
        <label for="first-custom-text">First Custom Text</label>
        <input id="first-custom-text" type="text" class="tw:appearance-none" />

        <label for="second-custom-text">Second Custom Text</label>
        <input id="second-custom-text" type="text" class="tw:appearance-none" />
      </div>
    </div>

    <div class="tw:grid">
      <div
        class="tw:grid tw:items-baseline tw:justify-start tw:gap-x-1 tw:grid-cols-[repeat(2,_auto)]"
      >
        <template v-for="fruit of fruits" :key="fruit.name">
          <label :for="`${fruit.name}-${fruit.value}`">{{ fruit.name }}</label>
          <input
            :id="`${fruit.name}-${fruit.value}`"
            type="radio"
            name="fruit"
            :value="fruit.value"
            class="tw:form-radio"
          />
        </template>
      </div>

      <div
        class="tw:grid tw:items-baseline tw:justify-start tw:gap-x-1 tw:grid-cols-[repeat(2,_auto)]"
      >
        <template v-for="fruit of fruits" :key="fruit.name">
          <label :for="`${fruit.name}-${fruit.value}-default`"
            >Default {{ fruit.name }}</label
          >
          <input
            :id="`${fruit.name}-${fruit.value}-default`"
            type="radio"
            name="fruit-default"
            :value="fruit.value"
          />
        </template>
      </div>

      <div
        class="tw:grid tw:items-baseline tw:justify-start tw:gap-x-1 tw:grid-cols-[repeat(2,_auto)]"
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
              'tw:appearance-none',
              'tw:grid',
              'tw:items-center',
              'tw:justify-center',
              'tw:px-[2px]',
              'tw:border-[2px]',
              'tw:border-[#8f8f9d]',
              'tw:border-solid',
              'tw:rounded-full',
              'tw:mt-[3px]',
              'tw:mr-[3px]',
              'tw:mb-0',
              'tw:ml-[5px]',
              'tw:w-[0.85rem]',
              'tw:h-[0.85rem]',
              'tw:after:w-[calc(0.85rem_*_0.5)]',
              'tw:after:h-[calc(0.85rem_*_0.5)]',
              'tw:hover:border-[#676774]',
              'tw:active:border-[#484851]',
              'tw:focus:outline',
              'tw:focus:outline-2',
              'tw:focus:outline-offset-1',
              'tw:focus:outline-[lightskyblue]',
              'tw:checked:border-[#3584e4]',
              'tw:focus:[&:not(:focus-visible)]:outline-0',
              'tw:checked:hover:border-[#1e6fc5]',
              'tw:checked:active:border-[#0059a8]',
              'tw:after:checked:rounded-[inherit]',
              'tw:after:checked:bg-[#3584e4]',
              'tw:after:checked:hover:bg-[#1e6fc5]',
              'tw:after:checked:active:bg-[#0059a8]',
            ]"
          />
        </template>
      </div>
    </div>
  </div>
</template>
