<template>
  <p class="child zero">Parent</p>
  <div class="child-zero">
    <p>Parent</p>
    <p class="child zero">Parent</p>
    <ChildOne />
    <ChildTwo />
  </div>
</template>

<script lang="ts" setup>
import ChildOne from "../components/style-inheritance/ChildOne.vue";
import ChildTwo from "../components/style-inheritance/ChildTwo.vue";
</script>

<style lang="scss">
.child-zero > {
  .child {
    color: green;
  }

  .child::after {
    content: " (parent)";
  }
}
</style>

<!--
<style scoped>
.child {
  color: green;
}

.child::after {
  content: " (parent)";
}
</style>
-->
