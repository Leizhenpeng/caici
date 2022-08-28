<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { mySocket } from '~/state'
const loadRouter = ref(false)
onMounted(() => {
  mySocket.value?.connect()
  mySocket.value?.on('connect', () => {
    console.log(mySocket.value?.id, 'socketId')
    setTimeout(() => {
      loadRouter.value = true
    }, 1000)
  })
})

onBeforeUnmount(() => {
  mySocket.value?.disconnect()
  mySocket.value?.off()
})
</script>

<template>
  <div v-if="loadRouter">
    <router-view />
  </div>
  <!-- <div v-else>
    <loading-one mx-a my-30vh />
  </div> -->
</template>

<style lang="scss" scoped>
</style>
