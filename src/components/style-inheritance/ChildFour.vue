<template>
  <p class="child four">Child Four</p>
  <div class="child-four">
    <p>Child Four</p>
    <p class="child four">Child Four</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChildOne",
});
</script>

<!--
<style lang="scss">
.child-four > {
  .child {
    color: darkred;
  }

  .child::after {
    content: " (four)";
  }
}
</style>
-->

<style scoped>
.child {
  color: blue;
}

.child::after {
  content: " (four)";
}
</style>
