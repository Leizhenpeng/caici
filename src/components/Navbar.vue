<script setup lang="ts">
import { tr } from 'date-fns/locale'
import { useRoute, useRouter } from 'vue-router'
import { isDark, showDashboard, showDoubleCheckExit, showHelp, showSettings, useMask } from '~/state'
import { gamesCount } from '~/storage'

const toggleDark = useToggle(isDark)
const toggleSettings = useToggle(showSettings)
const toggleDashboard = useToggle(showDashboard)
function openHelp() {
  showHelp.value = true
  useMask.value = false
}
const route = useRoute()
const router = useRouter()
const isSinglePlayer = computed(() => {
  return route.meta.mode === 'solo'
})

const goSolo = () => {
  router.replace({ name: 'solo' })
}
const goTogether = () => {
  router.replace({ path: '/together' })
}
const doubleCheckGoSolo = () => {
  showDoubleCheckExit.value = true
}
</script>

<template>
  <nav border="b base" relative>
    <div absolute font-serif text-2xl left-0 right-0 top-0 bottom-0 z--1 tracking-2 flex>
      <AppName ma />
    </div>
    <div flex items-center justify-between md:max-w-md ma py4 px2>
      <div flex items-center>
        <button icon-btn mx2 @click="toggleDark()">
          <div i-carbon-sun dark:i-carbon-moon />
        </button>
        <button icon-btn mx2 @click="openHelp()">
          <div i-carbon-help />
        </button>
      </div>
      <div flex items-center>
        <button v-if="isSinglePlayer" icon-btn mx2 @click="goTogether">
          <div i-carbon-collaborate />
        </button>
        <button v-else icon-btn mx2 @click="doubleCheckGoSolo">
          <div i-carbon-user-activity />
        </button>

        <button v-if="gamesCount" icon-btn mx2 @click="toggleDashboard()">
          <div i-carbon-catalog />
        </button>
        <button icon-btn mx2 @click="toggleSettings()">
          <div i-carbon-settings />
        </button>
      </div>
    </div>
  </nav>
</template>
