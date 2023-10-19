<script setup lang="ts">
const divideNumbers = (a: number, b: number) => {
  try {
    const result = a / b;
    if (!Number.isFinite(result)) {
      throw new Error("Result is infinite");
    }
    return result;
  } catch (error: unknown) {
    throw new Error("Failed to divide these numbers", {
      cause: {
        error,
        values: { a, b },
      },
    });
  }
};

const handleClick = () => {
  try {
    const result = divideNumbers(1, 0);
    console.log(result);
  } catch (error: unknown) {
    throw new Error("Aha! You found me!", {
      cause: error,
    });
  }
};
</script>

<template>
  <button @click="handleClick()">Throw an error</button>
</template>
