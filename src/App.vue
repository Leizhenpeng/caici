<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import '~/init'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-vue-v3'
import type { GlobalThemeOverrides } from 'naive-ui'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useCssVar } from '@vueuse/core'
import { SignUpDeviceId, getAllTopic } from './api'
import { dayNo, daySince, isDark, modelMaxHeight, mySocket, totalTopics } from '~/state'
import { colorblind, deviceId } from '~/storage'

const { height } = useWindowSize()

const ifSignedUpDeviceId = ref(false)
const ifGetAllTopic = ref(false)
const checkReady = computed(() => ifSignedUpDeviceId.value && ifGetAllTopic.value)
// printFinger
const { getData: get_fp_id } = useVisitorData(
  { extendedResult: true },
  { immediate: false },
)
async function checkDeviceId() {
  if (!deviceId.value) {
    await get_fp_id().then((res) => {
      const { visitorId } = res!
      deviceId.value = `FP_${visitorId}`
      //   .then((res) => {
      //   console.log('SignUpDeviceFeedBack', res)
      // })
    })
  }
  SignUpDeviceId(deviceId.value).then(() => {
    ifSignedUpDeviceId.value = true
  })
}

function checkTopicInit() {
  if (!totalTopics.value) {
    getAllTopic().then((res) => {
      totalTopics.value = res
      ifGetAllTopic.value = true
    })
  }
}

onMounted(() => {
  checkDeviceId()
  checkTopicInit()
})

watchEffect(() => {
  document.documentElement.style.setProperty('--vh', `${height.value / 100}px`)
})

const socket = inject('socket') as Socket
mySocket.value = socket

const el = ref(null)
const mainColor = useCssVar('--c-primary', el)
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: mainColor.value,
  },
}
const ifUseDarkTheme = computed(() => {
  if (isDark.value)
    return darkTheme

  return undefined
})

const navbarEl = ref(null)
const { height: MainH } = useElementSize(navbarEl)
const { height: windMaxH } = useWindowSize()

watch(
  MainH,
  () => {
    modelMaxHeight.value = windMaxH.value - MainH.value - 20
    console.log('modelMaxHeight', modelMaxHeight)
  },
)
</script>

<script lang="ts">
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="ifUseDarkTheme">
    <main ref="el" font-sans text="center gray-700 dark:gray-300" :class="{ colorblind }">
      <NotTodayBanner v-if="dayNo < daySince" />
      <Navbar ref="navbarEl" />
      <div v-if="checkReady">
        <router-view />
      </div>
      <div v-else>
        <loading-one mx-a my-30vh />
      </div>
      <Confetti />
    </main>
  </n-config-provider>
</template>
