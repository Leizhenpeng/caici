<script setup lang="ts">
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { dayNoHanzi, isDark, isIOS, isMobile, togetherWords, useMask } from '~/state'
import { t } from '~/i18n'
import { WHOLE_URL } from '~/logic'
import { nickName } from '~/storage'

const el = ref<HTMLDivElement>()
const show = ref(false)
const showDialog = ref(false)
const dataUrlUnmasked = ref('')
const dataUrlMasked = ref('')

const dataUrl = computed(() => useMask.value ? dataUrlMasked.value : dataUrlUnmasked.value)

const textUrl = ref(`${WHOLE_URL}/together?q=${togetherWords.value}`)
const qrcode = useQRCode(textUrl, {
  errorCorrectionLevel: 'H',
  quality: 0.92,
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
  await nextTick()
  await toPng(el.value!)
  dataUrlUnmasked.value = await toPng(el.value!)
  await nextTick()
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
    <button v-if="!isIOS" mx2 square-btn flex-gap-1 :disabled="!dataUrl" @click="download()">
      <div i-carbon-download />
      保存图片
    </button>

    <!-- <ToggleMask /> -->
  </div>

  <div v-if="show" fixed op0 top-0 left-0 pointer-events-none select-none>
    <div ref="el" flex="~ col" items-center p="x6 t6" bg-base relative text-center>
      <div font-serif>
        <p>仁兄万急:</p>
        <p indent text-justify mt-1>
          {{ `鄙人此有一字谜亟待解决，特请先生克日惠临寒舍，共同商讨，
          事关心情大计，实际迫切，幸勿吝驾。` }}
        </p>
        <p indent text-justify mb-1>
          日来事冗，恕不多叙，不胜迫切悬盼之至。
        </p>

        <p float-right>
          {{ `${nickName}谨上` }}
        </p>
      </div>
      <div flex="~">
        <img rounded-sm w-18 h-18 :src="qrcode" alt="QR Code">
      </div>
      <div text-xs mt3 op50 mb2 ws-nowrap>
        caici.forkway.cn
      </div>
    </div>
  </div>
</template>
