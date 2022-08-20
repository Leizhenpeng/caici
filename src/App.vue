<!-- eslint-disable no-console -->
<script setup lang="ts">
import { inject } from 'vue'

import '~/init'
import { answer, dayNo, daySince, isDev, isDevPro } from '~/state'
import { colorblind } from '~/storage'
import { DAYS_PLAY_BACK } from '~/logic/constants'

const { height } = useWindowSize()

watchEffect(() => {
  document.documentElement.style.setProperty('--vh', `${height.value / 100}px`)
})

if (isDevPro) {
  console.log('👋 Hello, developer!')
  const socket = inject('socket') as SocketIOClient.Socket
  socket.on('connect', () => {
    console.log('#connected: ', socket.id)
  })
}
</script>

<script lang="ts">
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-300" :class="{ colorblind }">
    <NotTodayBanner v-if="dayNo < daySince" />
    <Navbar />
    <div p="4">
      <NoQuizToday v-if="!answer.word" />
      <NoFuturePlay v-else-if="dayNo > daySince && !isDev" />
      <NoPastPlay v-else-if="daySince - dayNo > DAYS_PLAY_BACK && !isDev" />
      <Play v-else />
    </div>
    <ModalsLayer />
    <Confetti />
  </main>
</template>
