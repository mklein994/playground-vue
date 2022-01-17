<template>
  <button @click="clickMe">Click Me</button>
</template>

<script lang="ts" setup>
const otherFunc = () => {
  console.log("From otherFunc...");
  console.trace("Made it.");
};

function clickMe(event: MouseEvent) {
  console.groupCollapsed("dump");
  console.log(event);
  console.log("from clickMe…");
  otherFunc();
  console.groupEnd();
}
</script>
