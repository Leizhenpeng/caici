<script setup lang="ts">
import {
  breakpoints,
  showCheatSheet,
  showDashboard,
  showFailed,
  showHelp,
  showHint,
  showPrivacyNotes,
  showSettings,
  showShareDialog,
  showVariants,
} from '~/state'

const lg = breakpoints.lg
</script>

<template>
  <Modal v-model="showCheatSheet" :direction="lg ? 'right' : 'bottom'" :mask="!lg">
    <CheatSheet />
  </Modal>
  <Modal v-model="showSettings" direction="bottom">
    <Settings my6 />
  </Modal>
  <Modal v-model="showHint" direction="bottom">
    <Hint />
  </Modal>
  <Modal v-model="showFailed" direction="bottom">
    <FailedPage />
  </Modal>
  <Modal v-model="showDashboard" direction="bottom">
    <Dashboard />
  </Modal>
  <Modal v-model="showShareDialog" direction="bottom">
    <ShareDialog />
  </Modal>
  <Modal v-model="showHelp" direction="top">
    <WelcomePage />
  </Modal>
  <Modal v-model="showVariants" direction="bottom">
    <VariantLinks />
  </Modal>
  <Modal v-model="showPrivacyNotes" direction="bottom">
    <PrivacyNotes />
  </Modal>
</template>
