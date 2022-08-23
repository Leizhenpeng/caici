<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { SocketRole } from '~/state'

const props = withDefaults(defineProps<{
  name: string
  ifWait: boolean
  type?: SocketRole | null
}>(), {
  ifWait: false,
  type: SocketRole.Player,
})
const { ifWait } = props

const waitBorder = ref<HTMLElement>()
const avatar = ref<HTMLElement>()
const playerIconPool = [
  'i-mdi-seat-legroom-normal',
  'i-mdi-seat-legroom-reduced',
  'i-mdi-seat-recline-extra',
]
// random get one from playerIconPool
const playerIcon = ref(playerIconPool[Math.floor(Math.random() * playerIconPool.length)])
const { variant } = useMotion(waitBorder, {
  initial: { x: -50, opacity: 0 },
  enter: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'keyframes',
      ease: 'easeInOut',
      duration: 1200,
      onComplete: () => {
        setTimeout(() => { variant.value = 'levitate' }, 20)
      },
    },
  },
  levitate: {
    opacity: 0.3,
    transition: {
      duration: 1000,
      repeat: Infinity,
      ease: 'easeInOut',
      repeatType: 'mirror',
    },
  },
  exitOne: {
    y: -50,
    opacity: 0,
    transition: {
      duration: 2000,
      ease: 'easeInOut',
    },
  },
})
useMotion(avatar, {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1000,
      type: 'spring',
      stiffness: 100,
      damping: 10,
      mass: 1,
    },
  },
})
// watch(() => {
//   return ifWait
// }, (status) => {
//   if (!status)
//     stop()
// }, {
//   deep: true,
// })
</script>

<template>
  <div flex="~ center" w12 h12>
    <div v-if="ifWait" ref="waitBorder" w12 h12 border rounded op-60 border-1px />
    <div v-else ref="avatar" flex="~ col center">
      <n-avatar
        mt2 :style="{
          color: 'white',
          backgroundColor: 'gray',
        }"
      >
        <div v-if="type === SocketRole.Master" i-mdi-seat-outline btn-icon disabled />
        <div v-else-if="type === SocketRole.Player " :class="playerIcon" btn-icon disabled />
        <div v-else i-mdi-ghost-outline btn-icon disabled />
      </n-avatar>
      <p text-xs op-80 truncate max-w-48px>
        {{ props.name }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>
