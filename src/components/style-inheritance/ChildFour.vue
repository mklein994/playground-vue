<template>
  <p class="child four">Child Four</p>
  <div class="child-four">
    <p>Child Four</p>
    <p class="child four">Child Four</p>
  </div>
</template>

<!--
<style lang="scss">
.child-four > {
  .child {
    color: darkred;
  }

  .child::after {
    content: " (four)";
  }
}
</style>
-->

<style scoped>
.child {
  color: blue;
}

.child::after {
  content: " (four)";
}
</style>
