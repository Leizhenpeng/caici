<script lang="ts" setup>
import { mySocket } from '~/state'

onMounted(() => {
  mySocket.value?.connect()

  mySocket.value?.on('connect', () => {
    console.log(mySocket.value?.id)
  })
})

onBeforeUnmount(() => {
  mySocket.value?.disconnect()
})
</script>

<template>
  <div p="4">
    <Multiplayer />
  </div>
</template>

<style lang="scss" scoped>
</style>
