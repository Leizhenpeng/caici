<script setup lang="ts">
import { nanoid } from 'nanoid'
import { getRandomTip } from '~/api'
import { t } from '~/i18n'
import { UploadPlayerHinterLevel } from '~/socket-io'
import { answerTogther, hintLevelInRoom, hintTogether, mySocket, parseWord, showHint } from '~/state'

const parsed = computed(() => parseWord(hintTogether.value, answerTogther.value.word)[0])
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
const tip = ref('凡事都有偶然的凑巧，结果却又如宿命的必然。')
onMounted(() => {
  getRandomTip().then((res) => {
    tip.value = res
  })
})

function uploadLevelInfo() {
  mySocket.value?.emit(UploadPlayerHinterLevel,
    hintLevelInRoom.value,
  )
}

function changeHintLevel(level: number) {
  hintLevelInRoom.value = level
  uploadLevelInfo()
}
</script>

<template>
  <div p8 flex="~ col gap-4" items-center pb-20>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close()">
        <div i-carbon-close />
      </button>
    </div>
    <p text-xl font-serif mb4>
      <b v-if="hintLevelInRoom === 0">
        <div i-mdi-sticker-emoji text-5xl op50 m1 />
      </b>
      <b v-else>{{ t('hint') }}</b>
    </p>
    <div v-if="hintLevelInRoom === 0" flex="~ col gap-6 center" w-full>
      <!-- <div>{{ t('hint-tip') }}</div> -->
      <!-- new line for hint tip -->
      <div :key="hintTipKey" style="white-space: pre-wrap;">
        {{ tip }}
      </div>

      <div flex="~ row between space-x-1" w-50>
        <button class="btn bg-primary" @click="close">
          {{ t('check-back') }}
        </button>
        <button class="btn   bg-gray-600 op-80" @click="changeHintLevel(1)">
          {{ t('check-hint') }}
        </button>
      </div>
    </div>
    <div v-else flex="~ col center gap-4">
      <div>
        {{ t('hint-note') }} <b>{{ hintLevelInRoom === 2 ? t('hanzi') : t('ziyin') }}</b>
      </div>
      <CharBlock :char="hintLevelInRoom === 2 ? parsed : masked" />
      <button v-if="hintLevelInRoom === 1" class="btn bg-primary" @click="changeHintLevel(2)">
        {{ t('more-hint') }}
      </button>
      <button v-if="hintLevelInRoom === 2" class="btn bg-ok" @click="close">
        {{ t('hint-sure') }}
      </button>
    </div>
  </div>
</template>
