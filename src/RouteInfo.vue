<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const routeName = computed(() => route.name ?? "(unknown)");
</script>

<template>
  <pre class="route-name">{{ routeName }}</pre>
</template>

<style>
.route-name {
  display: inline-block;

  margin: 0;
  padding: 0.125rem 0.25rem;
  border: 1px solid black;

  text-transform: capitalize;
}
</style>
