<template>
  <div class="sass">
    This is highlighted in
    <code class="code">#{var(--sass-color)}</code>.
  </div>
</template>

<style lang="scss" scoped>
.sass {
  --sass-color: red;
  $primary-color: #{var(--sass-color)};

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
