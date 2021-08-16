<template>
  <div class="nth-child-component">
    <div
      v-for="kind in ['nth-child', 'sibling']"
      :key="kind"
      class="item-list"
      :class="kind"
    >
      <p v-for="i in 10" :key="i" class="item">Item {{ i }}</p>
    </div>
  </div>
</template>

<style scoped>
.nth-child-component {
  display: grid;
  justify-content: start;
  gap: 1rem;
  padding: 1rem;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border: 1px solid lightblue;
}

.item-list.nth-child > .item:nth-child(n + 2) {
  color: tomato;
}

.item-list.sibling > .item + .item {
  color: blue;
}
</style>
