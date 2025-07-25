<script setup lang="ts">
  import { ref } from "vue";

  const emoji = [
"\u{26a0}",
"\u{2600}",
"\u{1f30c}",
"\u{1f324}",
"\u{26c5}",
"\u{1f325}",
"\u{1f326}",
"\u{2601}",
"\u{2744}",
"\u{1f328}",
"\u{26c8}",
"\u{1f329}",
"\u{1f4a7}",
"\u{1f327}",
"\u{1f32a}",
"\u{1f300}",
"\u{1f32b}",
"\u{1f30b}",
"\u{1f3d6}",
"\u{2614}",
"\u{1f302}",
"\u{1f6a9}",
"\u{1f304}",
"\u{1f307}",
"\u{1f311}",
"\u{1f312}",
"\u{1f313}",
"\u{1f314}",
"\u{1f315}",
"\u{1f316}",
"\u{1f317}",
"\u{1f318}",
  ];

const variant = ref("normal");
</script>

<template>
  <div class="emoji-variant-experiment">
    <select id="variant" v-model="variant" name="variant">
      <option>normal</option>
      <option>text</option>
      <option>emoji</option>
      <option>unicode</option>
    </select>

    <ul>
      <li v-for="value of emoji" :key="value" class="emoji">{{ value }}</li>
    </ul>
  </div>
</template>

<style scoped>
.emoji {
  font-variant-emoji: v-bind("variant");
}
</style>
