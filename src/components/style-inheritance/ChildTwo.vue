<template>
  <p class="child two">Child Two</p>
  <div class="child-two">
    <p>Child Two</p>
    <p class="child two">Child Two</p>
    <ChildFour />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ChildFour from "./ChildFour.vue";

export default defineComponent({
  components: {
    ChildFour,
  },
});
</script>

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
  color: red;
}

.child::after {
  content: " (two)";
}
</style>
