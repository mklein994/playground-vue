<template><p class="child one">Child One</p></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChildOne",
});
</script>

<style>
.child {
  color: blue;
}

.child::after {
  content: " (one)";
}
</style>
