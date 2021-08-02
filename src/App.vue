<template>
  <Home class="home" />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Home from "./Home.vue";

export default defineComponent({
  name: "App",
  components: { Home },
});
</script>

<style>
.home {
  padding: 1rem;
}
</style>
