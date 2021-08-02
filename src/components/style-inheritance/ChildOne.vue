<template>
  <p class="child one">Child One</p>
  <div class="child-one">
    <p>Child One</p>
    <p class="child one">Child One</p>
    <ChildThree />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ChildThree from "./ChildThree.vue";

export default defineComponent({
  name: "ChildOne",
  components: {
    ChildThree,
  },
});
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
