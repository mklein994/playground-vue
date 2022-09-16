<script lang="ts">
interface Opts {
  id: string;
  label: string;

  min: number;
  max: number;
  step: number;
  userStep: number;
  default: number;
}
</script>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },

  opts: {
    type: Object as PropType<Opts>,
    required: true,
    validator: (opts: Opts) =>
      opts.default >= opts.min && opts.default <= opts.max,
  },
});

const emit = defineEmits<{
  (event: "update:modelValue", value: number): void;
}>();

const handleModelValueUpdate = (event: Event) => {
  const value = parseFloat((event.target as HTMLInputElement).value);
  emit("update:modelValue", value);
};

const subAxis = () => {
  let value = props.modelValue;
  const min = props.opts.min;

  if (value <= min) {
    return;
  }

  value -= props.opts.userStep;
  value = Math.max(value, min);

  emit("update:modelValue", value);
};

const addAxis = () => {
  let value = props.modelValue;
  const max = props.opts.max;

  if (value > max) {
    return;
  }

  value += props.opts.userStep;
  value = Math.min(value, max);

  emit("update:modelValue", value);
};
</script>

<template>
  <label :for="$props.opts.id">{{ $props.opts.label }}</label>
  <input
    :id="$props.opts.id"
    :value="modelValue"
    type="range"
    :name="$props.opts.id"
    :min="$props.opts.min"
    :max="$props.opts.max"
    :step="$props.opts.step"
    @input="handleModelValueUpdate"
  />

  <span class="value">{{ modelValue }}</span>

  <button :disabled="modelValue === $props.opts.min" @click="subAxis">-</button>

  <button :disabled="modelValue === $props.opts.max" @click="addAxis">+</button>

  <button @click="$emit('update:modelValue', props.opts.default)">Reset</button>
</template>
