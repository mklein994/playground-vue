<template>
  <RouteInfo />
  <Home />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Home from "./Home.vue";
import RouteInfo from "./RouteInfo.vue";

export default defineComponent({
  name: "App",
  components: { Home, RouteInfo },
});
</script>
