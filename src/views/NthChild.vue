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

<style>
.nth-child-component {
  display: grid;
  justify-content: start;
  padding: 1rem;
  gap: 1rem;

  .item-list {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid lightblue;
    gap: 1rem;

    &.nth-child > .item:nth-child(n + 2) {
      color: tomato;
    }

    &.sibling > .item + .item {
      color: dodgerblue;
    }
  }
}
</style>
