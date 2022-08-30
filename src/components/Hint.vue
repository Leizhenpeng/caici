<script setup lang="ts">
import { nanoid } from 'nanoid'
import { t } from '~/i18n'
import { getRandomHint } from '~/logic/hints'
import { answer, hint, parseWord, showHint } from '~/state'
import { currentMeta } from '~/storage'

const parsed = computed(() => parseWord(hint.value, answer.value.word)[0])
const masked = computed(() => ({
  ...parsed.value,
  char: '?',
}))
const hintTipKey = ref(nanoid())

function close() {
  showHint.value = false
}
watch(showHint, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      hintTipKey.value = nanoid()
    }, 500)
  }
})
</script>

<template>
  <div p8 flex="~ col gap-4" items-center>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close()">
        <div i-carbon-close />
      </button>
    </div>
    <p text-xl font-serif mb4>
      <b v-if="currentMeta.hintLevel === 0">{{ t('hint-ecourage') }}</b>
      <b v-else>{{ t('hint') }}</b>
    </p>
    <div v-if="currentMeta.hintLevel === 0" flex="~ col gap-6 center" w-full>
      <!-- <div>{{ t('hint-tip') }}</div> -->
      <!-- new line for hint tip -->
      <div :key="hintTipKey" v-html="getRandomHint.replace(/NL/g, ' <br> ')" />

      <div flex="~ row between space-x-1" w-50>
        <button class="btn bg-mis" @click="close">
          {{ t('check-back') }}
        </button>
        <button class="btn   bg-gray-600 op-80" @click="currentMeta.hintLevel = 1">
          {{ t('check-hint') }}
        </button>
      </div>
    </div>
    <div v-else flex="~ col center gap-4">
      <div>
        {{ t('hint-note') }} <b>{{ currentMeta.hintLevel === 2 ? t('hanzi') : t('ziyin') }}</b>
      </div>
      <CharBlock :char="currentMeta.hintLevel === 2 ? parsed : masked" />
      <button
        v-if="currentMeta.hintLevel === 1" class="btn bg-mis"
        @click="currentMeta.hintLevel = 2"
      >
        {{ t('more-hint') }}
      </button>
      <button v-if="currentMeta.hintLevel === 2" class="btn bg-ok" @click="close">
        {{ t('hint-sure') }}
      </button>
    </div>
  </div>
</template>
