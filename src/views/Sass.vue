<template>
  <div class="sass">
    This is highlighted in <code class="code">theme("colors.red.500")</code>.
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
$primary-color: theme("colors.red.500");

.sass {
  color: $primary-color;
}

.code {
  font-size: 1rem;

  &::before,
  &::after {
    content: "`";
  }
}
</style>
