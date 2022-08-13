<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useMotion } from '@vueuse/motion'

const props = withDefaults(defineProps<{
  name: string
  ifWait: boolean
}>(), {
  ifWait: false,
})
const { ifWait } = props

const waitBorder = ref<HTMLElement>()
const avatar = ref<HTMLElement>()

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
const { variant: avatarVar } = useMotion(avatar, {
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
        {{ props.name }}
      </n-avatar>
      <p text-xs op-80>
        {{ props.name }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>
