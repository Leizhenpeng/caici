<script setup lang="ts">
import { answer, hint, parseWord, showHint } from '~/state'
import { meta } from '~/storage'
import { t } from '~/i18n'

const parsed = computed(() => parseWord(hint.value, answer.value.word)[0])
const masked = computed(() => ({
  ...parsed.value,
  char: '?',
}))

function close() {
  showHint.value = false
}
</script>

<template>
  <div p8 flex="~ col gap-4" items-center>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close()">
        <div i-carbon-close />
      </button>
    </div>
    <p text-xl font-serif mb4>
      <b>{{ t('hint') }}</b>
    </p>
    <div>{{ t('hint-note') }} <b>{{ meta.hintLevel === 2 ? t('hanzi') : t('ziyin') }}</b></div>
    <CharBlock :char="meta.hintLevel === 2 ? parsed : masked" />
    <button
      v-if="meta.hintLevel === 1"
      class="btn bg-mis"
      @click="meta.hintLevel = 2"
    >
      {{ t('more-hint') }}
    </button>
    <button
      v-if="meta.hintLevel === 2"
      class="btn bg-ok"
      @click="close"
    >
      {{ t('hint-sure') }}
    </button>
  </div>
</template>
