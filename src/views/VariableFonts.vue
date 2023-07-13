<script setup lang="ts">
import { ref } from "vue";

import VariableFontAxis from "../components/variable-fonts/VariableFontAxis.vue";

const crsvOpts = [
  { id: "crsv-off", label: "off", value: "0" },
  { id: "crsv-auto", label: "auto", value: "0.5" },
  { id: "crsv-on", label: "on", value: "1" },
];

const fontSizeOpts = {
  id: "fontSize",
  label: "Font Size",
  min: 0.5,
  max: 40,
  step: 0.01,
  userStep: 2,
  default: 2,
};

const slntOpts = {
  id: "slnt",
  label: "slnt",
  min: -15,
  max: 0,
  step: 0.1,
  userStep: 1,
  default: 0,
};

const wghtOpts = {
  id: "wght",
  label: "wght",
  min: 300,
  max: 1_000,
  step: 1,
  userStep: 25,
  default: 300,
};

const caslOpts = {
  id: "casl",
  label: "CASL",
  min: 0,
  max: 1,
  step: 0.01,
  userStep: 0.5,
  default: 0,
};
const monoOpts = {
  id: "mono",
  label: "MONO",
  min: 0,
  max: 1,
  step: 0.01,
  userStep: 0.25,
  default: 0,
};

const fontSize = ref(fontSizeOpts.default);
const slnt = ref(slntOpts.default);
const wght = ref(wghtOpts.default);
const casl = ref(caslOpts.default);
const crsv = ref(crsvOpts[1].value);
const mono = ref(monoOpts.default);
</script>

<template>
  <div class="input-group">
    <VariableFontAxis v-model="fontSize" :opts="fontSizeOpts" />

    <VariableFontAxis v-model="slnt" :opts="slntOpts" />

    <VariableFontAxis v-model="wght" :opts="wghtOpts" />

    <VariableFontAxis v-model="casl" :opts="caslOpts" />

    <VariableFontAxis v-model="mono" :opts="monoOpts" />

    <div class="crsv-group">
      <label for="crsv">CRSV</label>

      <template v-for="{ id, label, value } of crsvOpts" :key="id">
        <span>
          <input
            :id="id"
            v-model="crsv"
            type="radio"
            name="crsv"
            :value="value"
          />
          <label :for="id">{{ label }}</label>
        </span>
      </template>
    </div>
  </div>

  <div class="content">
    <p>The quick brown fox jumps over the lazy dog</p>

    <p>
      Nullam eruditionem esse duxit, nisi quae beatae vitae disciplinam iuvaret.
      An ille tempus aut in dolore, sed in his rebus instructus semper est in
      voluptate. neque enim disputari sine reprehensione.
    </p>

    <p>
      Intellegunt totam rationem everti, si ita res se habeat. nam si dicent ab
      illis has res esse tractatas, ne ipsos quidem Graecos est cur verear, ne
      ad eam non possim.
    </p>

    <p>
      Tribus igitur modis video esse a nostris non legantur? Quamquam, si plane
      sic verterem Platonem aut Aristotelem, ut verterunt nostri poetae fabulas,
      male, credo, mererer de meis civibus, si ad.
    </p>

    <p>
      Principio, sed ex aeterno tempore intellegi convenire. Epicurus autem, in
      quibus nulla solida utilitas omnisque puerilis est delectatio, aut se, ut
      Plato, in musicis, geometria, numeris, astris contereret, quae et.
    </p>

    <p>
      Tueri, nisi aeque amicos et nosmet ipsos diligamus, idcirco et hoc ipsum
      efficitur in amicitia, et amicitia cum voluptate vivatur. quoniam autem id
      est incorruptis atque integris testibus, si infantes.
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
      Et magnitudinem solis probabo et Democriti errata ab Epicuro scriptum est
      et ad eos cum suavitate afflueret et illaberetur, nec manus esse contenta
      posset nec ulla pars vacuitate doloris sine.
    </p>

    <p>
      Scriptorem tamen, ut legendus sit. rudem enim esse censet, quantus
      videtur, vel paulo aut maiorem aut minorem. Ita, quae mutat, ea corrumpit,
      quae sequitur sunt tota Democriti, atomi, inane, imagines.
    </p>

    <p>
      Probarem, quae ille diceret? cum praesertim illa perdiscere ludus esset.
      Quam ob rem voluptas expetenda, fugiendus dolor sit. sentiri haec putat,
      ut calere ignem, nivem esse albam, dulce mel. quorum.
    </p>
  </div>
</template>

<style scoped>
.input-group {
  display: grid;
  margin: 1rem;
  gap: 1rem 0.5rem;
  grid: auto-flow / repeat(3, minmax(auto, 1fr)) repeat(3, auto);
}

.input-group button {
  padding: 0.25em 1em;
  border: 1px solid lightgray;
  border-radius: 0.5em;
}

.input-group button:disabled {
  background: rgb(0 0 0 / 0.125);
  cursor: auto;
  opacity: 0.5;
}

.crsv-group {
  display: grid;
  max-width: max-content;
  align-items: center;
  column-gap: 1rem;
  grid-column: 1 / -1;
  grid-template-columns: 1fr repeat(3, minmax(0, 1fr));
}

.crsv-group > * {
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
}

.content {
  font-family: Recursive, fantasy;
  font-size: calc(v-bind("fontSize") * 1vw);
  font-variation-settings:
    "slnt" v-bind("slnt"),
    "wght" v-bind("wght"),
    "CASL" v-bind("casl"),
    "CRSV" v-bind("crsv"),
    "MONO" v-bind("mono");
  hyphens: auto;

  overflow-wrap: break-word;
  word-break: break-word;
}

.content :first-child {
  margin: 0;
}
</style>
