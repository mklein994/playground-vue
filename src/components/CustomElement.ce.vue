<template>
  <div class="custom-element">
    <div v-for="i of 10" :key="i" class="item">Item {{ i }}</div>
  </div>
</template>

<style>
.custom-element {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  margin: 1em;
}

.item {
  padding: 1em;
  border: 1px solid light-dark(black, white);
  text-align: center;
}
</style>
