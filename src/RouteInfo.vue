<template>
  <pre class="route-name">{{ routeName }}</pre>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup: () => {
    const route = useRoute();

    const routeName = computed(() => route.name ?? "(unknown)");

    return {
      routeName,
    };
  },
});
</script>

<style scoped>
.route-name {
  margin: 0;
  border: 1px solid black;
  padding: 0.125rem 0.25rem;
  display: inline-block;
  text-transform: capitalize;
}
</style>
