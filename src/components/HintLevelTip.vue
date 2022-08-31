<script setup lang="ts">
import { hintColorPools, showHintLevelTip } from '~/state'

function close() {
  showHintLevelTip.value = false
}
const hintColor = computed(() => {
  return (hintLevel: number) => {
    return hintColorPools[hintLevel]
  }
})
</script>

<template>
  <div p5 flex="~ col center" relative>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close">
        <div i-carbon-close />
      </button>
    </div>

    <p text-xl font-serif mb2>
      <b>颜色的含义</b>
    </p>
    <div my-4 flex="center ~ col gap-1" font-serif>
      <div flex="~ center row gap-2">
        <div i-carbon-circle-filled w-3 pl-3 :class="hintColor(0)" />
        <p>一身浩然正气</p>
      </div>
      <div flex="~ center row gap-2">
        <div i-carbon-circle-filled w-3 pl-3 :class="hintColor(1)" />
        <p>知晓字音提示</p>
      </div>
      <div flex="~ center row gap-2">
        <div i-carbon-circle-filled w-3 pl-3 :class="hintColor(2)" />
        <p>偷看字形提示</p>
      </div>
    </div>

    <button btn mt-2 mb-4 @click="close">
      知道了
    </button>
  </div>
</template>
