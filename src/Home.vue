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
  margin: 0;
  padding: 0;
  list-style-type: circle;
  list-style-position: inside;
}

li {
  text-transform: capitalize;
}

.active {
  list-style-type: disc;
  color: green;
}
</style>
