<!-- <script setup lang="ts"> -->
<!-- import { useResetCss } from "@/use/use-reset-css"; -->
<!---->
<!-- useResetCss(); -->
<!-- </script> -->

<template>
  <div class="anchor-positioning-experiment">
    <article class="article">
      <p>
        Lorem ipsa repudiandae commodi iste nihil Ex provident iure excepturi
        iste provident odit corrupti Ex quas obcaecati aperiam earum modi
        Repellendus in qui adipisci alias consequatur Aspernatur neque minima
        enim ex obcaecati? Distinctio alias minima ducimus facere magnam
        eveniet? Voluptatum porro ducimus possimus beatae eius Id modi non
        blanditiis nostrum vero. Maiores possimus sequi amet voluptas dolorem
        atque Illo amet eaque pariatur et maiores dolores! Debitis nulla
        reiciendis voluptatum a assumenda sit Ipsum laboriosam pariatur
      </p>

      <p>
        Elit delectus consectetur porro harum quaerat Distinctio incidunt ex
        fugit nisi nostrum Quod deserunt est facere voluptate facilis? Neque
        aspernatur reiciendis quisquam ullam recusandae! Debitis officiis animi
        animi atque adipisci
      </p>

      <div tabindex="0" popovertarget="info-box" class="anchor">
        This is the anchor. &#x2693;
      </div>
      <div id="info-box" class="info-box" popover>
        <p>Hey there!</p>
      </div>

      <p>
        Adipisicing esse nam ducimus eligendi soluta. Est laudantium eligendi
        aspernatur saepe beatae dolorem Illo magnam iusto odio et aperiam
        Possimus quisquam laudantium earum perspiciatis itaque. Nemo suscipit
        tempora reprehenderit amet
      </p>

      <p>
        Sit voluptates ipsam illum suscipit quos repellat? Quod illum
        exercitationem delectus sit voluptatem nesciunt, minus. Nemo quo quam
        ratione deserunt earum eligendi adipisci sequi quod Recusandae
        accusantium illum ut cum sunt Sequi saepe iusto optio minima aliquid?
        Asperiores veniam dicta quibusdam repellat ex Eos numquam voluptatum
        quas laudantium sequi Expedita amet corporis maxime asperiores
        molestiae! Ullam exercitationem eum minima quae.
      </p>
    </article>
  </div>
</template>

<style>
.anchor-positioning-experiment {
  padding: var(--pv-b-spacing-4);

  .article {
    overflow-y: auto;

    max-inline-size: var(--pv-b-container-xs);
    max-block-size: var(--pv-b-container-3xs);
    padding: var(--pv-b-spacing-2);
    border: 1px solid
      light-dark(var(--pv-b-color-neutral-500), var(--pv-b-color-neutral-500));
  }

  .anchor {
    anchor-name: --my-anchor;
    width: fit-content;
    border: 1px solid var(--pv-b-color-neutral-300);
  }

  .info-box {
    position: absolute;
    position-anchor: --my-anchor;
    position-area: bottom;
    position-visibility: anchor-visible;
    position-try-fallbacks: flip-block, right;
    /* top: calc(anchor(bottom) + 5px); */
    /* margin: var(--pv-b-spacing-2) 0 0 var(--pv-b-spacing-2); */
    /* margin: 5px 0 0 5px; */
    background: var(--pv-b-color-sky-500);
  }
}
</style>
