<script setup lang="ts">
import { t } from '~/i18n'
import { topicNow } from '~/storage'

defineProps<{
  lite?: boolean
}>()
</script>

<template>
  <div flex="~ col">
    <div pb2 op50>
      {{ t('choose-topic') }}
    </div>
    <div flex="~ center wrap">
      <div square-btn m2>
        <button :class="topicNow === 'chengyu4' ? 'text-primary' : 'op80' " @click="topicNow = 'chengyu4'">
          {{ t('play-title-chengyu') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="topicNow === 'shici5' ? 'text-primary' : 'op80' " @click="topicNow = 'shici5'">
          {{ t('play-title-wuyan') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="topicNow === 'shici7' ? 'text-primary' : 'op80' " @click="topicNow = 'shici7'">
          {{ t('play-title-qiyan') }}
        </button>
      </div>
    </div>
  </div>
</template>
