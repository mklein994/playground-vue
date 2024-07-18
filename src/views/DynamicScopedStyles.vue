<script setup lang="ts">
import { computed, ref } from "vue";

const showRedClass = ref(false);

const toggleClass = () => {
  showRedClass.value = !showRedClass.value;
};

const fooClass = computed(() =>
  showRedClass.value ? "red-class" : "blue-class",
);
</script>

<template>
  <div>
    <button @click="toggleClass">Toggle Class</button>
    <p :class="fooClass">
      Elit labore optio quia explicabo sunt blanditiis saepe. Doloribus
      architecto rerum consectetur ducimus placeat! Accusamus voluptate ut
      laborum ipsam vero? Voluptates est vero perspiciatis repellat numquam
      Nulla aperiam natus maiores
    </p>
  </div>
</template>

<style scoped>
.red-class {
  color: red;
}

.blue-class {
  color: blue;
}
</style>
