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
pre {
  margin: 0;
  padding: 0;
}

.component-name {
  position: fixed;
  top: 0;
  right: 0;
  padding: 0.125rem 0.25rem;
  border: 1px solid black;
  border-top: none;
  border-right: none;
}
</style>
