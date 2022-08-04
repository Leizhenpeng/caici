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
    <div v-if="meta.hintLevel === 0" flex="~ col gap-6 center" w-full>
      <div>{{ t('hint-tip') }}</div>

      <div flex="~ row between space-x-1" w-50>
        <button
          class="btn bg-gray-600 op-50"
          @click="close"
        >
          {{ t('check-back') }}
        </button>
        <button
          class="btn bg-mis"
          @click="meta.hintLevel = 1"
        >
          {{ t('check-hint') }}
        </button>
      </div>
    </div>
    <div v-else flex="~ col center gap-4">
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
  </div>
</template>
