<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import '~/init'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-vue-v3'
import { SignUpDeviceId } from './api'
import { dayNo, daySince, mySocket } from '~/state'
import { colorblind, deviceId } from '~/storage'

const { height } = useWindowSize()

// printFinger
const { getData: get_fp_id } = useVisitorData(
  { extendedResult: true },
  { immediate: false },
)
function checkDeviceId() {
  if (!deviceId.value) {
    get_fp_id().then((res) => {
      const { visitorId } = res!
      deviceId.value = visitorId
      SignUpDeviceId(deviceId.value)
      //   .then((res) => {
      //   console.log('SignUpDeviceFeedBack', res)
      // })
    })
  }
}
onMounted(() => {
  checkDeviceId()
})

watchEffect(() => {
  document.documentElement.style.setProperty('--vh', `${height.value / 100}px`)
})

const socket = inject('socket') as Socket
mySocket.value = socket
</script>

<script lang="ts">
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-300" :class="{ colorblind }">
    <NotTodayBanner v-if="dayNo < daySince" />
    <Navbar />
    <router-view />
    <ModalsLayer />
    <Confetti />
  </main>
</template>
