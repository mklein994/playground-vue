<script setup lang="ts">
import ChildThree from "./ChildThree.vue";
</script>

<template>
  <p class="child one">Child One</p>
  <div class="child-one">
    <p>Child One</p>
    <p class="child one">Child One</p>
    <ChildThree></ChildThree>
  </div>
</template>

<style lang="scss">
.child-one > {
  .child {
    color: dodgerblue;
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
