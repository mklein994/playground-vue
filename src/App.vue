<template>
  <Home />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Home from "./Home.vue";

export default defineComponent({
  components: { Home },
});
</script>
