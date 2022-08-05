<script setup lang="ts">
import { formatDuration, currentMeta } from '~/storage'
import { t } from '~/i18n'
import { dayNoHanzi } from '~/state'

defineProps<{
  day?: boolean
}>()

const hintText = computed(() => {
  if (!currentMeta.value.hintLevel)
    return t('hint-level-none')
  else if (currentMeta.value.hintLevel === 1)
    return t('hint-level-1')
  else if (currentMeta.value.hintLevel === 2)
    return t('hint-level-2')
  else if (currentMeta.value.hintLevel === 3)
    return t('hint-level-3')
  else
    return t('hint-level-none')
})
</script>

<template>
  <div op50 my1 text-sm ws-nowrap text-center>
    <template v-if="day">
      {{ dayNoHanzi }} ·
    </template>
    {{ hintText }} ·
    <template v-if="currentMeta.strict">
      {{ t('strict-mode') }} ·
    </template>
    {{ formatDuration(currentMeta.duration || 0) }}
  </div>
</template>
