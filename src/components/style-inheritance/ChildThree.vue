<template>
  <p class="child three">Child Three</p>
  <div class="child-three">
    <p>Child Three</p>
    <p class="child three">Child Three</p>
  </div>
</template>

<!--
<style lang="scss">
.child-three > {
  .child {
    color: darkblue;
  }

  .child::after {
    content: " (three)";
  }
}
</style>
-->

<style scoped>
.child {
  color: darkcyan;
}

.child::after {
  content: " (three)";
}
</style>
