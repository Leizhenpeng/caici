<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { t } from '~/i18n'
import { topicNow } from '~/storage'

defineProps<{
  lite?: boolean
}>()
const router = useRouter()
function changeTopic(topic: string) {
  switch (topic) {
    case 'shici5':
      topicNow.value = 'shici5'
      break
    case 'shici7':
      topicNow.value = 'shici7'
      break
    case 'chengyu4':
      topicNow.value = 'chengyu4'
      break
    default:
      topicNow.value = 'chengyu4'
      break
  }
  router.replace({
    name: 'solo',
    query: {
      topic: topicNow.value,
    },
  })
}
</script>

<template>
  <div flex="~ col">
    <div pb2 op50>
      {{ t('choose-topic') }}
    </div>
    <div flex="~ center wrap gap-1">
      <div square-btn m2>
        <button p1 :class="topicNow === 'chengyu4' ? 'text-primary' : 'op80' " @click="changeTopic('chengyu4')">
          {{ t('topic-chengyu') }}
        </button>
        <div w-1px h-4 border="r base" px1 />
        <button p1 :class="topicNow === 'shici5' ? 'text-primary' : 'op80' " @click="changeTopic('shici5')">
          {{ t('topic-wuyan') }}
        </button>
        <div w-1px h-4 border="r base" px1 />
        <button p1 :class="topicNow === 'shici7' ? 'text-primary' : 'op80' " @click="changeTopic('shici7')">
          {{ t('topic-qiyan') }}
        </button>
      </div>
    </div>
  </div>
</template>
