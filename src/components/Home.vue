<template>
  <ul>
    <li v-for="link of links" :key="link.path">
      <RouterLink :to="link.path">{{ link.name }}</RouterLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { routes } from "../routes";

export default defineComponent({
  name: "Home",
  setup: () => {
    const links = computed(() => routes.filter((x) => x.name !== undefined));

    return {
      links,
    };
  },
});
</script>
