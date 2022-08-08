<script setup lang="ts">
import { isDark, showDashboard, showHelp, showMultiplayer, showSettings, useMask } from '~/state'
import { gamesCount } from '~/storage'

const toggleDark = useToggle(isDark)
const toggleSettings = useToggle(showSettings)
const toggleDashboard = useToggle(showDashboard)
const toggleMultiplier = useToggle(showMultiplayer)
function openHelp() {
  showHelp.value = true
  useMask.value = false
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
        <button icon-btn mx2 @click="toggleMultiplier()">
          <div i-carbon-partnership />
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
