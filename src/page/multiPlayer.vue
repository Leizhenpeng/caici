<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { nanoid } from 'nanoid'
import { mySocket } from '~/state'

onMounted(() => {
  mySocket.value?.connect()
  mySocket.value?.on('connect', () => {
    console.log(mySocket.value?.id, nanoid())
  })
})

onBeforeUnmount(() => {
  mySocket.value?.disconnect()
  mySocket.value?.off()
})
</script>

<template>
  <div p="4">
    <Multiplayer />
  </div>
</template>

<style lang="scss" scoped>
</style>
