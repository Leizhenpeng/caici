<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { roomAccess, roomInfo } from '~/api'
import { mySocket } from '~/state'
import { TogetherGameMode, deviceId } from '~/storage'

const router = useRouter()
const route = useRoute()
const roomId = route.query?.id as string
const ifPass = route.params?.pass as string

const wordLength = ref(0)
const playMode = ref(TogetherGameMode.COMPETITION)

const redictWaitRoom = () => {
  router.replace({
    name: 'together-wait',
    params: {
      notCheck: 1,
    },
  })
}

// master? player? watcher?
async function checkRoomIfAccessible(roomId: string, uuid: string) {
  if (!roomId) {
    router.replace({ name: 'together-wait' })
    return false
  }

  if (ifPass)
    return true
  const { ifAccessible } = await roomAccess(roomId, deviceId.value, mySocket.value?.id as string)
  if (!ifAccessible)
    router.replace({ name: 'together-wait' })
}

async function getRoomInfo(roomId: string, uuid: string) {
  roomInfo(roomId, uuid).then(
    (out) => {
      wordLength.value = out.wordLength!
      playMode.value = out.playMode as TogetherGameMode
    },
  ).catch(
    (err) => {
      console.error(err)
      redictWaitRoom()
    },
  )
}

onMounted(async () => {
  await checkRoomIfAccessible(roomId, deviceId.value)
  await getRoomInfo(roomId, deviceId.value)
})
</script>

<template>
  <div p="4">
    <PlayTogether :key="wordLength" :word-length="wordLength" :game-mode="playMode" />
  </div>
</template>

<style lang="scss" scoped>
</style>
