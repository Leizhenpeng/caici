<script setup lang="ts">
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { dayNoHanzi, isDark, isIOS, isMobile, nowTopic, useMask } from '~/state'
import { tries } from '~/storage'
import { t } from '~/i18n'
// import { WHOLE_URL } from '~/logic'

const el = ref<HTMLDivElement>()
const show = ref(false)
const showDialog = ref(false)
const dataUrlUnmasked = ref('')
const dataUrlMasked = ref('')

const dataUrl = computed(() => useMask.value ? dataUrlMasked.value : dataUrlUnmasked.value)

const text = window.location.href
const qrcode = useQRCode(text, {
  errorCorrectionLevel: 'H',
  quality: 0.3,
  margin: 2,
  color: {
    dark: isDark.value ? '#ffffff' : '#000000',
    light: isDark.value ? '#00000010' : '#ffffff10',
  },
})

// promise await qrcode is note empty
async function waitQRCode() {
  return new Promise<void>((resolve) => {
    // until qrcode is not empty
    const interval = setInterval(() => {
      if (qrcode.value) {
        clearInterval(interval)
        resolve()
      }
    }, 200)
  })
}

async function render() {
  await waitQRCode()
  show.value = true
  await nextTick()
  await nextTick()
  showDialog.value = true
  const p = useMask.value
  useMask.value = false
  await nextTick()
  await toPng(el.value!)
  dataUrlUnmasked.value = await toPng(el.value!)
  useMask.value = true
  await nextTick()
  dataUrlMasked.value = await toPng(el.value!)
  useMask.value = p
  show.value = false
}

onMounted(() => render())

async function download() {
  saveAs(dataUrl.value, `${t('name')} ${dayNoHanzi.value}${useMask.value ? ' 遮罩' : ''}.png`)
}
</script>

<template>
  <div v-if="isMobile" op50 mb4>
    {{ t('press-and-download-image') }}
  </div>
  <img v-if="dataUrl && qrcode" :src="dataUrl" w-80 min-h-10 border="~ base rounded">
  <div v-else w-80 border="~ base rounded" p4 animate-pulse>
    {{ t('rendering') }}
  </div>

  <div flex="~" py4>
    <button v-if="!isIOS" mx2 btn flex="center row ~" flex-gap-1 :disabled="!dataUrl" @click="download()">
      <div i-carbon-download />
      {{ t('download') }}
    </button>
    <ToggleMask />
  </div>

  <div v-if="show" fixed op0 top-0 left-0 pointer-events-none select-none>
    <div ref="el" flex="~ col" items-center p="x6 t6" bg-base relative text-center>
      <div flex="~ between" items-center w-full mb-3>
        <div flex=" ~ col" items-start justify-end h-full ml-2>
          <AppName :height="4" />
          <div class="mt-1px w-full">
            <ResultFooter :day="true" :demo-version="1" />
          </div>
        </div>
        <img rounded-sm w-26 h-26 :src="qrcode" alt="QR Code" mr-1>
      </div>
      <WordBlocks v-for="w, i of tries" :key="i" :word="w" :revealed="true" :animate="false" :word-length="w.length" />
      <div text-xs mt3 op50 mb2 ws-nowrap>
        caici.forkway.cn
      </div>
    </div>
  </div>
</template>
