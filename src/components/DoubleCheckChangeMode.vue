<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getRandomTip } from '~/api'
import { t } from '~/i18n'
import { showDoubleCheckExit } from '~/state'
const router = useRouter()

const close = () => {
  showDoubleCheckExit.value = false
}

function goSolo() {
  close()
  router.replace({ name: 'solo' })
}
const seeyouTip = ref('')
function getRandomSeeUTip() {
  getRandomTip('SEEYOU').then(
    (content) => {
      seeyouTip.value = content
    },
  ).catch(
    (err) => {
      console.error(err)
    },
  )
}

onMounted(
  () => {
    getRandomSeeUTip()
  })
</script>

<template>
  <div p5 flex="~ col center">
    <div i-mdi-emoticon-wink-outline text-5xl op50 m4 />
    <div text-sm>
      {{ seeyouTip }}<br>
    </div>
    <div py6 flex="~ gap-5 center">
      <button btn @click="close">
        {{ t('continue') }}
      </button>
      <button icon-btn flex="inline gap-1 center" text="base mis!" @click="goSolo">
        <div i-mdi-emoticon-confused-outline /> {{ t('check_exit') }}
      </button>
    </div>
  </div>
</template>
