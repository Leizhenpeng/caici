<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { findWorkById, getWorkId } from '~/api'
import { DAYS_PLAY_BACK } from '~/logic/constants'
import { answer, dayNo, daySince, ifShici, isDev, nowWorkDetail } from '~/state'
import { currentMeta, topicNow } from '~/storage'

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
