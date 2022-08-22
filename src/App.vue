<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import '~/init'
import { dayNo, daySince, mySocket } from '~/state'
import { colorblind } from '~/storage'

const { height } = useWindowSize()

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
