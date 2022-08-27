<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { roomAccess } from '~/api'
import { deviceId } from '~/storage'

const router = useRouter()
const route = useRoute()
const roomId = route.query?.id as string
const ifPass = route.params?.pass as string
// master? player? watcher?
async function checkRoomIfAccessible(roomId: string, uuid: string) {
  if (!roomId) {
    router.replace({ name: 'together-wait' })
    return false
  }

  if (ifPass)
    return true
  const { ifAccessible } = await roomAccess(roomId, deviceId.value)
  if (!ifAccessible)
    router.replace({ name: 'together-wait' })
}
onMounted(async () => {
  await checkRoomIfAccessible(roomId, deviceId.value)
})
</script>

<template>
  <div p="4">
    <PlayTogether />
  </div>
</template>

<style lang="scss" scoped>
</style>
