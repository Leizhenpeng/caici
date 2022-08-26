<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { nanoid } from 'nanoid'
import { useRoute } from 'vue-router'
import { mySocket } from '~/state'

const router = useRoute()
const wordFromUrl = router.query?.q as string

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
    <Multiplayer :pre-put-word="wordFromUrl" />
  </div>
</template>

<style lang="scss" scoped>
</style>
