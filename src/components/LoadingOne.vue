<script lang="ts" setup>
import { Back, Elastic, Expo, gsap } from 'gsap'
const currentLogo = ref('https://caici.forkway.cn/logo-no-bg.png')
const slackBubble = ref()
const slackBubblePulse = ref()
const tl = gsap.timeline({
  paused: false,
  defaults: {
    ease: Elastic.easeOut.config(1, 0.3),
  },
  onComplete: () => {
    tl.restart()
  },
})

onMounted(
  () => {
    tl.to(slackBubble.value, 0.4, {
      scale: 0.8,
      rotation: 16,
      ease: Back.easeOut.config(1.7),
    })
    tl.to(
      slackBubblePulse.value,
      0.8,
      {
        scale: 0.9,
        opacity: 1,
      },
      '-=0.6',
    )
    tl.to(slackBubble.value, 1.2, {
      scale: 1,
      rotation: '-=16',
      ease: Elastic.easeOut.config(2.5, 0.5),
    })
    tl.to(
      slackBubblePulse.value,
      1.1,
      {
        scale: 3,
        opacity: 0,
        ease: Expo.easeOut,
      },
      '-=1.2',
    )
  },
)
</script>

<template>
  <div class="bubble-wrapper">
    <div ref="slackBubble" class="bubble mxa dark:border-white dark:border-op-1 dark:bg-white dark:bg-op-10">
      <img class="bubble-image" :src="currentLogo">
    </div>

    <div ref="slackBubblePulse" class="bubble-pulse bg-black! bg-op-4! dark:bg-white! dark:bg-op-8!" />
  </div>
</template>

<style lang="css" scoped>
.bubble-wrapper {
    position: relative;
}

.bubble {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #ffffff90;
    border-radius: 50%;
    height: 200px;
    width: 200px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.bubble-pulse {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -150px;
    height: 300px;
    width: 300px;
    border-radius: 50%;
    opacity: 0;
    transform: scale(0);
}

.bubble-image {
    width: 60%;
}
</style>
