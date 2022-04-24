<template>
  <div class="css-layers">
    <p class="first">First</p>
    <p class="second">Second</p>
    <p class="layer-color">Hello</p>
    <p>
      To learn more about <code>@layer</code> and CSS Cascade Layers, see this
      blog post:
      <cite
        ><a
          href="https://www.bram.us/2021/09/15/the-future-of-css-cascade-layers-css-at-layer/"
          >The Future of CSS: Cascade Layers (CSS <code>@layer</code>)</a
        ></cite
      >.
    </p>
  </div>
</template>

<style scoped>
.css-layers {
  --layer-color-first: tomato;
  --layer-color-second: dodgerblue;
}

/* define layer order */
@layer first, second;

@layer second {
  .layer-color {
    color: var(--layer-color-second);
  }

  .layer-color::after {
    content: " (second layer)";
  }
}

@layer first {
  .layer-color {
    color: var(--layer-color-first);
  }

  .layer-color::after {
    content: " (first layer)";
  }
}

.first {
  color: var(--layer-color-first);
}

.second {
  color: var(--layer-color-second);
}
</style>
