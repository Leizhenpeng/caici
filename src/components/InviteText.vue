<script setup lang="ts">
import { t } from '~/i18n'
import { WHOLE_URL } from '~/logic/constants'
import { isMobile, togetherWords } from '~/state'

const inviteText = '绿蚁新醅酒，红泥小火炉。/n晚来天欲雪，能猜一词无？'
const lines = computed(() => {
  return [
    // t('name'),
    // '',
    [
      // nickName.value,
      '问才子',
    ].filter(Boolean).join(''),
    '',
    ...inviteText.split('/n'),
    '',
    '',
    `雅令：${togetherWords.value}`,
    '',
    'https://caici.forkway.cn/together',
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
    {{ copied ? t('invite-copied') : t('invite-not-copied') }}
  </p>
  <textarea
    bg-gray-500:5 rounded p5 select-text resize-none outline-none w-90 text-center font-serif
    style="line-height: 19px;letter-spacing: 1px;" :rows="lines.length" :value="text" readonly
  />
  <button v-if="share.isSupported" my4 square-btn @click="shareSystem()">
    <div i-carbon-share />
    {{ t('share-with-system-api') }}
  </button>
</template>
