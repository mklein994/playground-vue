<script setup lang="ts">
import * as Sentry from "@sentry/vue";

const divideNumbers = (a: number, b: number) => {
  try {
    Sentry.addBreadcrumb({
      message: "Dividing some numbers",
      data: { a, b },
      level: "debug",
    });
    const result = a / b;
    if (!Number.isFinite(result)) {
      throw new Error("Result is infinite");
    }
    return result;
  } catch (error: unknown) {
    const err = new Error("Failed to divide these numbers", {
      cause: error,
    });
    Sentry.captureException(err);
    throw err;
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
