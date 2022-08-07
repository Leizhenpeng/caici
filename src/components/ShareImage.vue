<script setup lang="ts">
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { dayNoHanzi, isDark, isIOS, isMobile, useMask } from '~/state'
import { tries } from '~/storage'
import { t } from '~/i18n'

const el = ref<HTMLDivElement>()
const show = ref(false)
const showDialog = ref(false)
const dataUrlUnmasked = ref('')
const dataUrlMasked = ref('')

const dataUrl = computed(() => useMask.value ? dataUrlMasked.value : dataUrlUnmasked.value)

async function render() {
  show.value = true
  await nextTick()
  await nextTick()
  showDialog.value = true
  const p = useMask.value
  useMask.value = false
  await nextTick()
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

const text = ref('https://caicis.forkway.cn/')
const qrcode = useQRCode(text, {
  errorCorrectionLevel: 'H',
  quality: 0.3,
  margin: 2,
  color: {
    dark: isDark.value ? '#ffffff' : '#000000',
    light: isDark.value ? '#00000010' : '#ffffff10',
  },
})
</script>

<template>
  <div v-if="isMobile" op50 mb4>
    {{ t('press-and-download-image') }}
  </div>
  <img v-if="dataUrl" :src="dataUrl" w-80 min-h-10 border="~ base rounded">
  <div v-else w-80 border="~ base rounded" p4 animate-pulse>
    {{ t('rendering') }}
  </div>

  <div flex="~" py4>
    <button v-if="!isIOS" mx2 square-btn flex-gap-1 :disabled="!dataUrl" @click="download()">
      <div i-carbon-download />
      {{ t('download') }}
    </button>

    <ToggleMask mx2 />
  </div>

  <div v-if="show" fixed op0 top-0 left-0 pointer-events-none>
    <div ref="el" flex="~ col" items-center p="x6 t6" bg-base relative text-center>
      <div flex="~ between" items-center w-full mb-3>
        <div flex=" ~ col" items-start justify-end h-full>
          <AppName />
          <ResultFooter :day="true" mt2 w-full :demo-version="1" />
        </div>
        <img rounded-sm w-18 h-18 :src="qrcode" alt="QR Code">
      </div>
      <WordBlocks v-for="w, i of tries" :key="i" :word="w" :revealed="true" :animate="false" />
      <div text-xs mt3 op50 mb2 ws-nowrap>
        caici.forkway.cn
      </div>
    </div>
  </div>
</template>
