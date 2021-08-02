<template>
  <pre class="component-name">{{ componentName }}</pre>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup: () => {
    const route = useRoute();

    const componentName = computed(
      () => route.matched[0]?.components.default?.name ?? "(unknown)"
    );

    return {
      componentName,
    };
  },
});
</script>

<style scoped>
.component-name {
  margin: 0;
  border: 1px solid black;
  padding: 0.125rem 0.25rem;
  display: inline-block;
}
</style>
