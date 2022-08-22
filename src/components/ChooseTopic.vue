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
    <div flex="~ center wrap gap-1">
      <div square-btn m2>
        <button p1 :class="topicNow === 'chengyu4' ? 'text-primary' : 'op80' " @click="topicNow = 'chengyu4'">
          {{ t('topic-chengyu') }}
        </button>
        <div w-1px h-4 border="r base" px1 />
        <button p1 :class="topicNow === 'shici5' ? 'text-primary' : 'op80' " @click="topicNow = 'shici5'">
          {{ t('topic-wuyan') }}
        </button>
        <div w-1px h-4 border="r base" px1 />
        <button p1 :class="topicNow === 'shici7' ? 'text-primary' : 'op80' " @click="topicNow = 'shici7'">
          {{ t('topic-qiyan') }}
        </button>
      </div>
    </div>
  </div>
</template>
