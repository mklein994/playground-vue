<template>
  <ChildOne />
  <ChildTwo />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ChildOne from "../components/ChildOne.vue";
import ChildTwo from "../components/ChildTwo.vue";

export default defineComponent({
  name: "StyleInheritance",
  components: {
    ChildOne,
    ChildTwo,
  },
});
</script>

<style>
.child {
  color: green;
}

.child::after {
  content: " (parent)";
}
</style>
