<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import '~/init'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-vue-v3'
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

const ifUseDarkTheme = computed(() => {
  if (isDark.value)
    return darkTheme

  return undefined
})
const themeOverrides = computed(() => {
  return {
    common: {
      primaryColor: mainColor.value,
    },
  }
})

const navbarEl = ref(null)
const { height: MainH } = useElementSize(navbarEl)
const { height: windMaxH } = useWindowSize()

watch(
  MainH,
  () => {
    modelMaxHeight.value = windMaxH.value - MainH.value - 20
  },
)
</script>

<script lang="ts">
// const customBg = computed(() => {
//   return {
//     backgroundImage: 'url(\'test2.png\'})',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   }
// },
// )
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="ifUseDarkTheme">
    <main ref="el" font-sans text="center gray-700 dark:gray-300" :class="{ colorblind }">
      <NotTodayBanner v-if="dayNo < daySince" />
      <Navbar ref="navbarEl" />
      <div v-if="checkReady">
        <n-scrollbar :style="{ maxHeight: `${modelMaxHeight}px` }">
          <router-view :class="[isDark ? 'base-bg-work-dark' : 'base-bg-work']" />
        </n-scrollbar>
      </div>
      <div v-else>
        <loading-one mx-a my-30vh />
      </div>
      <Confetti />
    </main>
  </n-config-provider>
</template>

<style lang="scss" scoped>
.base-bg-work::before,
.base-bg-work::after,
.base-bg-work-dark::before,
.base-bg-work-dark::after {
  content: '';
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
  height: 30vh;
  width: 100vw;
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
}

.base-bg-work::before {
  --link: 'test.png';
  background-image: url('/guzhou.png');
}

.base-bg-work::after {
  background-image:
    linear-gradient(135deg, #fff, rgba(255, 255, 255, .875), rgba(255, 255, 255, .35))
}

.base-bg-work-dark::before {
  background-image: url('/milu-dark.png');
}

.base-bg-work-dark::after {
  background-image:radial-gradient(circle, rgba(18, 18, 18, 0.3) 0%, rgba(18, 18, 18, 0.7) 60%, rgba(18, 18, 18, 0.8) 98%);
}
</style>
