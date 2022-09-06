<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ifOnGame } from '~/api'
import { deviceId } from '~/storage'

const router = useRouter()
const route = useRoute()
const wordFromUrl = route.query?.q as string
const notCheck = route.params?.notCheck as string
const showWait = ref(false)
console.log('notCheck', notCheck)
const redictGameRoom = (targetRoomId: string) => {
  router.replace({
    name: 'room',
    query: {
      id: targetRoomId,
    },
    params: {
      pass: 1,
    },
  })
}

function ifOngameCheck() {
  ifOnGame(deviceId.value).then((data) => {
    if (data.ifOnGame) {
      redictGameRoom(data.roomId!)
      return
    }
    showWait.value = true
  })
}

onMounted(
  () => {
    if (!notCheck)
      ifOngameCheck()
    else
      showWait.value = true
  },
)
</script>

<template>
  <div>
    <Multiplayer v-if="showWait" :pre-put-word="wordFromUrl" />
  </div>
</template>

<style lang="scss" scoped>
</style>
