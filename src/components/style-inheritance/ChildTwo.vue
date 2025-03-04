<script setup lang="ts">
import ChildFour from "./ChildFour.vue";
</script>

<template>
  <p class="child two">Child Two</p>
  <div class="child-two">
    <p>Child Two</p>
    <p class="child two">Child Two</p>
    <ChildFour></ChildFour>
  </div>
</template>

<!--
<style lang="scss">
.child-two > {
  .child {
    color: red;
  }

  .child::after {
    content: " (two)";
  }
}
</style>
-->

<style scoped>
.child {
  color: tomato;
}

.child::after {
  content: " (two)";
}
</style>
