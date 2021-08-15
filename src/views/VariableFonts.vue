<template>
  <div class="weight">
    <input
      id="wght"
      v-model="wght"
      type="range"
      name="wght"
      min="100"
      max="700"
      step="1"
    />
    {{ wght }}
  </div>
  <div class="italic">
    <input id="italic" v-model="italic" type="checkbox" name="italic" />
  </div>
  <div class="content">
    <h1 class="heading">The quick brown fox jumps over the lazy dog</h1>
    <div
      :style="{
        fontWeight: wght,
        fontStyle: italic ? 'italic' : 'normal',
        fontVariationSettings: `ital ${italic ? 1 : 0}`,
      }"
      class="text"
    >
      <p>
        Nullam eruditionem esse duxit, nisi quae beatae vitae disciplinam
        iuvaret. An ille tempus aut in dolore, sed in his rebus instructus
        semper est in voluptate. neque enim disputari sine reprehensione.
      </p>
      <p>
        Intellegunt totam rationem everti, si ita res se habeat. nam si dicent
        ab illis has res esse tractatas, ne ipsos quidem Graecos est cur verear,
        ne ad eam non possim.
      </p>
      <p>
        Tribus igitur modis video esse a nostris non legantur? Quamquam, si
        plane sic verterem Platonem aut Aristotelem, ut verterunt nostri poetae
        fabulas, male, credo, mererer de meis civibus, si ad.
      </p>
      <p>
        Principio, sed ex aeterno tempore intellegi convenire. Epicurus autem,
        in quibus nulla solida utilitas omnisque puerilis est delectatio, aut
        se, ut Plato, in musicis, geometria, numeris, astris contereret, quae
        et.
      </p>
      <p>
        Tueri, nisi aeque amicos et nosmet ipsos diligamus, idcirco et hoc ipsum
        efficitur in amicitia, et amicitia cum voluptate vivatur. quoniam autem
        id est incorruptis atque integris testibus, si infantes.
      </p>
      <p>
        Laetitiam, id est laborum et dolorum fuga. et harum quidem rerum facilis
        est et ad eos cum suavitate afflueret et illaberetur, nec manus esse
        contenta posset nec ulla pars vacuitate.
      </p>
      <p>
        Voluptates, quarum potiendi spe inflammati multos labores magnosque
        susceperant. ecce autem alii minuti et angusti aut omnia semper
        desperantes aut malivoli, invidi, difficiles, lucifugi, maledici,
        monstruosi, alii autem etiam amatoriis.
      </p>
      <p>
        Et magnitudinem solis probabo et Democriti errata ab Epicuro scriptum
        est et ad eos cum suavitate afflueret et illaberetur, nec manus esse
        contenta posset nec ulla pars vacuitate doloris sine.
      </p>
      <p>
        Scriptorem tamen, ut legendus sit. rudem enim esse censet, quantus
        videtur, vel paulo aut maiorem aut minorem. Ita, quae mutat, ea
        corrumpit, quae sequitur sunt tota Democriti, atomi, inane, imagines.
      </p>
      <p>
        Probarem, quae ille diceret? cum praesertim illa perdiscere ludus esset.
        Quam ob rem voluptas expetenda, fugiendus dolor sit. sentiri haec putat,
        ut calere ignem, nivem esse albam, dulce mel. quorum.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup: () => {
    const wght = ref(100);
    const italic = ref(false);

    return {
      wght,
      italic,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Texturina:wght@100..700&display=swap");

.heading {
  font-family: "Roboto Slab";
}

.text {
  font-family: Texturina;
}

.content {
  overflow-y: scroll;
  height: 75vh;
}
</style>
