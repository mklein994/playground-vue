<template>
  <div class="custom-element">
    <div v-for="i of 10" :key="i" class="item">Item {{ i }}</div>
  </div>
</template>

<style>
.custom-element {
  margin: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
}

.item {
  padding: 1em;
  border: 1px solid black;
  text-align: center;
}
</style>
