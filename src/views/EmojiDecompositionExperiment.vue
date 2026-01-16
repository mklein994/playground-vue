<script setup lang="ts">
import { computed, ref } from "vue";

const toHex = (value: number): string => value.toString(16).padStart(4, "0");

/**
 * v-focus directive
 *
 * See also: https://vuejs.org/guide/reusability/custom-directives.html#when-to-use
 */
const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
};

const examples = computed(() => [
  {
    name: "Canadian Flag",
    emoji: "\u{1f1e8}\u{1f1e6}",
  },
  {
    name: "Couple with Heart: Woman, Man, Light Skin Tone, Medium Skin Tone",
    emoji:
      "\u{1f469}\u{1f3fb}\u{200d}\u{2764}\u{fe0f}\u{200d}\u{1f468}\u{1f3fd}",
  },
]);

const emoji = ref(examples.value[0].emoji);
const unicode = computed(() =>
  Array.from(emoji.value)
    .map((x) => `\\u{${toHex(x.codePointAt(0)!)}}`)
    .join(""),
);

const emojiParts = computed(() =>
  Array.from(emoji.value).map((character, index) => {
    const isNonPrinting = /^(?:\p{Format}|\p{Nonspacing_Mark})$/v.test(
      character,
    );
    const codePoint = character.codePointAt(0)!;
    const hex = toHex(codePoint);
    return {
      index,
      unicodeDisplay: `U+${hex.toUpperCase()}`,
      isNonPrinting,
      characterDisplay: isNonPrinting ? `\\u{${hex}}` : character,
    };
  }),
);

const handleExampleClick = (example: string) => {
  emoji.value = example;
};
</script>

<template>
  <div class="emoji-decomposition-experiment">
    <div class="pv-input-wrapper">
      <label for="emoji">Emoji</label>
      <input
        id="emoji"
        v-model="emoji"
        v-focus
        type="text"
        pattern="\p{RGI_Emoji}"
        required
        class="pv-input emoji-input"
      />
    </div>

    <ul class="pv-list examples">
      <li v-for="example of examples" :key="example.emoji">
        <button
          type="button"
          class="pv-button"
          @click="handleExampleClick(example.emoji)"
        >
          {{ example.emoji }} {{ example.name }}
        </button>
      </li>
    </ul>

    <div class="emoji-presentation">
      <p>{{ emoji }}</p>
      <ol class="part-list">
        <li v-for="part of emojiParts" :key="part.index" class="emoji-part">
          <code class="emoji-code"
            >{{ part.unicodeDisplay }}: {{ part.characterDisplay }}</code
          >
        </li>
      </ol>
    </div>
    <div>
      <code class="pv-code">{{ unicode }}</code>
    </div>
  </div>
</template>

<style>
.emoji-decomposition-experiment {
  padding: var(--pv-b-spacing-4);

  .emoji-input {
    &:valid {
      outline: 1px solid var(--pv-yes);
    }

    &:invalid {
      outline: 1px solid var(--pv-no);
    }
  }

  .examples {
    color-scheme: light;
  }

  .emoji-presentation {
    font-size: clamp(
      var(--pv-b-font-size-3xl),
      1rem + 4vmin,
      var(--pv-b-font-size-9xl)
    );
    line-height: normal;
  }

  .part-list {
    padding-inline-start: calc(var(--pv-b-spacing-6) + 4vmin);
  }
}
</style>
