<script setup lang="ts">
import { nanoid } from 'nanoid'
import { locale } from '~/i18n'
import {
  breakpoints,
  showBrandShareDialog,
  showCheatSheet,
  showDashboard,
  showDoubleCheckExit,
  showFailed,
  showHelp,
  showHint,
  showHintLevelTip,
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
    <CheatSheet :if-sole="false" />
  </Modal>
  <!-- //TODO://change backe -->
  <Modal v-model="showMetaDetail" :direction="lg ? 'right' : 'bottom'">
    <!-- <MetaDetailCard /> -->
  </Modal>
  <Modal v-model="showHintLevelTip" :direction="lg ? 'right' : 'bottom'">
    <HintLevelTip />
  </Modal>
  <Modal v-model="showDoubleCheckExit" :direction="lg ? 'bottom' : 'bottom'">
    <DoubleCheckChangeMode />
  </Modal>
  <Modal v-model="showSettings" :direction="lg ? 'right' : 'bottom'">
    <Settings v-if="lg" my6 />
    <SettingsMobile v-else :key="localeId" my6 />
  </Modal>
  <Modal v-model="showHint" :direction="lg ? 'bottom' : 'bottom'">
    <HintInRoom />
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
  <Modal v-model="showHelp" :direction="lg ? 'bottom' : 'bottom'">
    <WelcomePage :if-solo="false" />
  </Modal>
  <Modal v-model="showVariants" :direction="lg ? 'right' : 'bottom'">
    <VariantLinks />
  </Modal>
  <Modal v-model="showPrivacyNotes" :direction="lg ? 'right' : 'bottom'">
    <PrivacyNotes />
  </Modal>
</template>
