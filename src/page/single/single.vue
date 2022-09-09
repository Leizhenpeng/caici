<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { findWorkById, getWorkId } from '~/api'
import { DAYS_PLAY_BACK } from '~/logic/constants'
import { answer, dayNo, daySince, ifShici, isDev, nowWorkDetail } from '~/state'
import { currentMeta, topicNow } from '~/storage'

const route = useRoute()
function changeTopicFromUrl() {
  const chooseTopic = route.query?.topic as string
  if (chooseTopic) {
    switch (chooseTopic) {
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
  }
}
onMounted(() => {
  changeTopicFromUrl()
})
function saveWorkId() {
  if (ifShici.value && !currentMeta.value?.workId) {
    getWorkId(answer.value.word).then(({ objectId }) => {
      currentMeta.value.workId = objectId
      console.log('workId refresh', objectId)
    })
  }
}

watch(
  () => currentMeta.value?.workId, (newValue) => {
    if (newValue) {
      findWorkById(newValue).then((out) => {
        nowWorkDetail.value = out
      })
    }
  }, {
    immediate: true,
  },
)

watch(topicNow, () => {
  saveWorkId()
}, {
  immediate: true,
})
</script>

<template>
  <div>
    <div p4>
      <NoQuizToday v-if="!answer.word" />
      <NoFuturePlay v-else-if="dayNo > daySince && !isDev" />
      <NoPastPlay v-else-if="daySince - dayNo > DAYS_PLAY_BACK && !isDev" />
      <Play v-else />
    </div>
    <ModalsLayerSolo />
  </div>
</template>

<style lang="scss" scoped>
</style>
