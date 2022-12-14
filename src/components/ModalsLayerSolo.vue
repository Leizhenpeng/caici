<script setup lang="ts">
import { nanoid } from 'nanoid'
import Modal from './Modal.vue'
import { locale } from '~/i18n'
import {
  breakpoints,
  nowWorkDetail,
  showBrandShareDialog,
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
const welcomeRef = ref<InstanceType<typeof Modal>>()
watch(showHelp, (newValue) => {
  newValue && welcomeRef.value?.scrollTopModel()
}, {
})
</script>

<template>
  <Modal v-model="showCheatSheet" :direction="lg ? 'right' : 'bottom'" :mask="!lg">
    <CheatSheet />
  </Modal>
  <Modal v-model="showMetaDetail" :direction="lg ? 'bottom' : 'bottom'">
    <MetaDetailCard v-if="!!nowWorkDetail" :key="nowWorkDetail.objectId" :base-info="nowWorkDetail!" />
  </Modal>
  <Modal v-model="showSettings" :direction="lg ? 'bottom' : 'bottom'">
    <Settings v-if="lg" my6 />
    <SettingsMobile v-else :key="localeId" my6 />
  </Modal>
  <Modal v-model="showHint" :direction="lg ? 'bottom' : 'bottom'">
    <Hint />
  </Modal>
  <Modal v-model="showFailed" :direction="lg ? 'right' : 'bottom'">
    <FailedPage />
  </Modal>
  <Modal v-model="showDashboard" :direction="lg ? 'right' : 'bottom'">
    <Dashboard />
  </Modal>
  <Modal v-model="showTogetherShare" :direction="lg ? 'right' : 'bottom'">
    <InviteDialog />
  </Modal>
  <Modal v-model="showShareDialog" :direction="lg ? 'right' : 'bottom'">
    <ShareDialog />
  </Modal>
  <Modal v-model="showBrandShareDialog" :direction="lg ? 'right' : 'bottom'" :z-index="100">
    <ShareDialog :if-share-on-brand="true" />
  </Modal>
  <Modal ref="welcomeRef" v-model="showHelp" :direction="lg ? 'bottom' : 'bottom'">
    <WelcomePage />
  </Modal>
  <Modal v-model="showVariants" :direction="lg ? 'right' : 'bottom'">
    <VariantLinks />
  </Modal>
  <Modal v-model="showPrivacyNotes" :direction="lg ? 'right' : 'bottom'">
    <PrivacyNotes />
  </Modal>
</template>
