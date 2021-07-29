<template>
  <nav class="links">
    <ul>
      <li
        v-for="link of links"
        :key="link.path"
        :class="$route.path === link.path ? 'active' : ''"
      >
        <RouterLink :to="link.path">{{ link.name }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  setup: () => {
    const router = useRouter();
    const links = computed(() =>
      router.getRoutes().filter((x) => x.name !== undefined)
    );

    return {
      links,
    };
  },
});
</script>

<style>
.links ul {
  list-style-type: circle;
}

li {
  text-transform: capitalize;
}

.active {
  list-style-type: disc;
  color: green;
}
</style>
