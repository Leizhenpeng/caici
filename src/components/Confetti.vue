<script setup lang="ts">
import confetti from 'canvas-confetti'
import sample from 'lodash/sample'
import { showConfetti, showHelp } from '~/state'
const defaultColors = ['#5D8C7B',
  '#F2D091',
  '#F2A679',
  '#D9695F',
  '#8C4646']

function congrats_one() {
  const defaults = {
    colors: defaultColors,
    shapes: ['square'],
    ticks: 1500,
  } as confetti.Options
  // confetti({
  //   ...defaults,
  //   particleCount: 200,
  //   spread: 60,
  //   origin: { y: 0 },
  // })
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 400,
      angle: 60,
      spread: 120,
      origin: { x: 0 },
      decay: 0.92,
      // startVelocity: 25,
    })
  }, 250)
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 400,
      angle: 120,
      spread: 120,
      decay: 0.92,
      origin: { x: 1 },
      // startVelocity: 45,

    })
  }, 400)
}

const congrates_two: any = () => {
  function randomInRange(min: number, max: number): any {
    return Math.random() * (max - min) + min
  }
  const duration = 3 * 1000
  const animationEnd = Date.now() + duration
  const defaults_two = { colors: defaultColors, startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  const show: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0)
      return clearInterval(show)

    const particleCount = 100 * (timeLeft / duration)
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults_two, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }))
    confetti(Object.assign({}, defaults_two, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }))
  }, 250)
}

const congrate_all = [
  congrats_one,
  congrates_two,
]

watch(showConfetti, (v) => {
  if (v && !showHelp.value)
    showFire()
}, { flush: 'post', immediate: true })

function showFire() {
  setTimeout(sample(congrate_all), 300)
}
</script>

<template>
  <div />
</template>
