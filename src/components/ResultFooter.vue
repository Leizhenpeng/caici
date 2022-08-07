<script setup lang="ts">
import { currentMeta, formatDuration } from '~/storage'
import { t } from '~/i18n'
import { dayNoHanzi, nowTopicTitleShort } from '~/state'

const props = withDefaults(defineProps<{
  day?: boolean
  demoVersion?: number
}>(), {
  demoVersion: 0, // 0: paly, 1: shareImage, 2: demo2
})

const { demoVersion, day } = props
// const hintText = computed(() => {
//   if (!currentMeta.value.hintLevel)
//     return t('hint-level-none')
//   else if (currentMeta.value.hintLevel === 1)
//     return t('hint-level-1')
//   else if (currentMeta.value.hintLevel === 2)
//     return t('hint-level-2')
//   else if (currentMeta.value.hintLevel === 3)
//     return t('hint-level-3')
//   else
//     return t('hint-level-none')
// })
// TODO: level 2 is temp solution for hintText
const hintText = computed(() => {
  if (!currentMeta.value.hintLevel)
    return t('hint-level-none')
  else if (currentMeta.value.hintLevel === 1)
    return t('hint-level-1')
  else if (currentMeta.value.hintLevel === 2)
    return t('hint-level-3')
  else if (currentMeta.value.hintLevel === 3)
    return t('hint-level-3')
  else
    return t('hint-level-none')
})
</script>

<template>
  <div v-if="demoVersion === 0" op50 my1 text-sm ws-nowrap text-center>
    <template v-if="day">
      {{ dayNoHanzi }} · {{ nowTopicTitleShort }} ·
    </template>
    {{ hintText }} ·
    <template v-if="currentMeta.strict">
      {{ t('strict-mode') }} ·
    </template>
    {{ formatDuration(currentMeta.duration || 0) }}
  </div>
  <div v-if="demoVersion === 1" mt-2 text-md ws-nowrap text-left ml-1px>
    <div v-if="day" font-serif op-80>
      {{ dayNoHanzi }} · {{ nowTopicTitleShort }}
    </div>
    <p text-sm op-50>
      {{ hintText }} ·
      <template v-if="currentMeta.strict">
        {{ t('strict-mode') }} ·
      </template>
      {{ formatDuration(currentMeta.duration || 0) }}
    </p>
  </div>
</template>
