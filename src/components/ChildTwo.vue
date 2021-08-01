<template><p class="child two">Child Two</p></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChildTwo",
});
</script>

<style>
.child {
  color: red;
}

.child::after {
  content: " (two)";
}
</style>
