<template>
  <div class="custom-element">
    <div v-for="i of 10" :key="i" class="item">Item {{ i }}</div>
  </div>
</template>

<style>
.custom-element {
  display: grid;
  margin: 1em;
  gap: 1em;
  grid-template-columns: repeat(3, 1fr);
}

.item {
  padding: 1em;
  border: 1px solid black;
  text-align: center;
}
</style>
