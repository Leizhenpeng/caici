<script setup lang="ts">
import { nanoid } from 'nanoid'
import { locale } from '~/i18n'
import {
  breakpoints,
  nowWorkDetail,
  showCheatSheet,
  showDashboard,
  showFailed,
  showHelp,
  showHint,
  showMetaDetail,
  showPrivacyNotes,
  showSettings,
  showShareDialog,
  showTogetherShare,
  showVariants,
} from '~/state'

const lg = breakpoints.lg

const localeId = ref(nanoid())
watch((locale), () => {
  localeId.value = nanoid()
}, {
  immediate: true,
})
</script>

<template>
  <Modal v-model="showCheatSheet" :direction="lg ? 'right' : 'bottom'" :mask="!lg">
    <CheatSheet />
  </Modal>
  <Modal v-model="showMetaDetail" :direction="lg ? 'bottom' : 'bottom'">
    <MetaDetailCard v-if="!!nowWorkDetail" :key="nowWorkDetail.objectId" :base-info="nowWorkDetail!" />
  </Modal>
  <Modal v-model="showSettings" :direction="lg ? 'top' : 'bottom'">
    <Settings v-if="lg" my6 />
    <SettingsMobile v-else :key="localeId" my6 />
  </Modal>
  <Modal v-model="showHint" :direction="lg ? 'top' : 'bottom'">
    <Hint />
  </Modal>
  <Modal v-model="showFailed" :direction="lg ? 'top' : 'bottom'">
    <FailedPage />
  </Modal>
  <Modal v-model="showDashboard" :direction="lg ? 'top' : 'bottom'">
    <Dashboard />
  </Modal>
  <Modal v-model="showTogetherShare" :direction="lg ? 'top' : 'bottom'">
    <InviteDialog />
  </Modal>
  <Modal v-model="showShareDialog" :direction="lg ? 'top' : 'bottom'">
    <ShareDialog />
  </Modal>
  <Modal v-model="showHelp" :direction="lg ? 'top' : 'bottom'">
    <WelcomePage />
  </Modal>
  <Modal v-model="showVariants" :direction="lg ? 'top' : 'bottom'">
    <VariantLinks />
  </Modal>
  <Modal v-model="showPrivacyNotes" :direction="lg ? 'top' : 'bottom'">
    <PrivacyNotes />
  </Modal>
</template>
