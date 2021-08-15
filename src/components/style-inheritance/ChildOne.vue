<template>
  <p class="child one">Child One</p>
  <div class="child-one">
    <p>Child One</p>
    <p class="child one">Child One</p>
    <ChildThree />
  </div>
</template>

<script lang="ts" setup>
import ChildThree from "./ChildThree.vue";
</script>

<style lang="scss">
.child-one > {
  .child {
    color: blue;
  }

  .child::after {
    content: " (one)";
  }
}
</style>

<!--
<style scoped>
.child {
  color: blue;
}

.child::after {
  content: " (one)";
}
</style>
-->
