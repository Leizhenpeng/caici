<script setup lang="ts">
import { t } from '~/i18n'
import { WHOLE_URL } from '~/logic/constants'
import { answer, dayNoHanzi, isMobile, nowTopicTitleShort, parseWord, testAnswer } from '~/state'
import { currentMeta, tries } from '~/storage'

const lines = computed(() => {
  const table = tries.value.map((word) => {
    const parsed = parseWord(word, answer.value.word)
    return testAnswer(parsed)
      .map((i, idx) => {
        if (i.char === 'exact')
          return '๐ฅ'
        if (i.char === 'misplaced')
          return '๐ฉ'
        if (parsed[idx]._1 && i._1 === 'exact')
          return '๐ด'
        if (parsed[idx]._2 && i._2 === 'exact')
          return '๐ด'
        if (parsed[idx]._3 && i._3 === 'exact')
          return '๐ด'
        if (i._1 === 'misplaced' || i._2 === 'misplaced' || i._3 === 'misplaced')
          return '๐ข'
        return 'โฌ๏ธ'
      })
      .join('')
  })

  return [
    t('name'),
    '',
    [
      dayNoHanzi.value,
      nowTopicTitleShort.value,
      currentMeta.value.strict ? t('strict-mode').slice(0, 2) : '',
      !currentMeta.value.hint ? t('hint-level-none') : '',
    ].filter(Boolean).join(' ยท '),
    '',
    ...table,
    '',
    'https://caici.forkway.cn',
  ]
})

const text = computed(() => lines.value.join('\n'))

const share = useShare(computed(() => ({
  title: t('name'),
  text: text.value,
  url: WHOLE_URL,

})))
const clipboard = useClipboard()
const copied = ref(false)

async function shareSystem() {
  if (share.isSupported && isMobile) {
    await share.share()
    return true
  }
  return false
}

onMounted(async () => {
  if (clipboard.isSupported) {
    await clipboard.copy(text.value)
    copied.value = true
  }
})
</script>

<template>
  <p text-center mb4>
    {{ copied ? t('share-copied') : t('share-not-copied') }}
  </p>
  <textarea
    bg-gray-500:5 rounded p5 select-text resize-none outline-none w-90 text-center
    style="line-height: 19px;letter-spacing: 1px;" :rows="lines.length" :value="text" readonly
  />
  <button v-if="share.isSupported" my4 square-btn @click="shareSystem()">
    <div i-carbon-share />
    {{ t('share-with-system-api') }}
  </button>
</template>
