<template>
  <p class="child three">Child Three</p>
  <div class="child-three">
    <p>Child Three</p>
    <p class="child three">Child Three</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<!--
<style lang="scss">
.child-three > {
  .child {
    color: darkblue;
  }

  .child::after {
    content: " (three)";
  }
}
</style>
-->

<style scoped>
.child {
  color: darkblue;
}

.child::after {
  content: " (three)";
}
</style>
