<script setup lang="ts">
const foo = {
  bar: {
    baz: 5,
  },
};

const fooCopy = JSON.parse(JSON.stringify(foo));

const bar = foo.bar;
bar.baz = 6;
</script>

<template>
  <div class="pass-by-reference">
    <pre><strong>fooCopy:</strong> {{ fooCopy }}</pre>
    <pre><strong>foo:</strong> {{ foo }}</pre>
  </div>
</template>
