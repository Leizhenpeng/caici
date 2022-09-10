<script setup lang="ts">
import saveAs from 'file-saver'
import { t } from '~/i18n'
import { isIOS, isMobile } from '~/state'

const dataUrl = ref('./og.png')

async function download() {
  saveAs(dataUrl.value, `${t('name')}.png`)
}
</script>

<template>
  <div>
    <div v-if="isMobile" op50 mb4>
      {{ t('press-and-download-image') }}
    </div>
    <img v-if="dataUrl" :src="dataUrl" w-80 min-h-10 border="~ base rounded">
    <div v-else w-80 border="~ base rounded" p4 animate-pulse>
      {{ t('rendering') }}
    </div>

    <div flex="~ center" py4>
      <button v-if="!isIOS" mx2 btn flex="center row ~" flex-gap-1 :disabled="!dataUrl" @click="download()">
        <div i-carbon-download />
        {{ t('download') }}
      </button>
    </div>
  </div>
</template>
