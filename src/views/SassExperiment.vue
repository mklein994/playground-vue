<template>
  <div class="sass">
    This is highlighted in
    <code class="code">#{var(--pv-color-base-red-500)}</code>.
  </div>
</template>

<style lang="scss" scoped>
$primary-color: #{var(--pv-color-base-red-500)};

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
