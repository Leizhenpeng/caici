<script setup lang="ts">
import { ifMinFont5 as ifMinFont5_, ifMinFont7 as ifMinFont7_, parseWord, parsedAnswer, testAnswer, answer as todayAnswer } from '~/state'
import { wordLengthNow } from '~/storage'
const props = withDefaults(
  defineProps<{
    word: string
    revealed?: boolean
    answer?: string
    animate?: boolean
    active?: boolean
    forceFour?: boolean // 强制 4字, 用在多人成语口令中
  }>(), {
    animate: true,
    forceFour: false,
  },
)

const result = computed(() => {
  if (props.revealed) {
    return testAnswer(
      parseWord(props.word),
      props.answer ? parseWord(props.answer) : parsedAnswer.value,
    )
  }
  return []
})

const flip = ref(false)

watchEffect(() => {
  if (props.revealed) {
    setTimeout(() => {
      flip.value = true
    }, Math.random() * 300)
  }
})

const wordLength = computed(() => {
  if (props.forceFour)
    return 4

  return wordLengthNow.value
})
const ifMinFont5 = computed(() => {
  if (!props.forceFour)
    return ifMinFont5_.value
  return false
})
const ifMinFont7 = computed(() => {
  if (!props.forceFour)
    return ifMinFont7_.value
  return false
})
</script>

<template>
  <div flex>
    <div
      v-for="c, i in parseWord(word.padEnd(wordLength, ' '), answer || todayAnswer.word)" :key="i"
      w-20 h-20 m1
      class="tile"
      :class="[
        flip ? 'revealed' : '',
        ifMinFont5 ? '!w-16 !h-18' : '',
        ifMinFont7 ? '!w-11 !h-13' : '',
      ]"
    >
      <template v-if="animate">
        <CharBlock
          class="front"
          :char="c"
          :active="active"
          :style="{ transitionDelay: `${i * (300 + Math.random() * 50)}ms` }"
          :force-four="forceFour"
        />
        <CharBlock
          class="back"
          :char="c"
          :answer="result[i]"
          :force-four="forceFour"

          :style="{
            transitionDelay: `${i * (300 + Math.random() * 50)}ms`,
            animationDelay: `${i * (100 + Math.random() * 50)}ms`,
          }"
        />
      </template>
      <template v-else>
        <CharBlock
          :char="c"
          :answer="result[i]"
          :active="active"
          :force-four="forceFour"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.tile {
  user-select: none;
  position: relative;
}
.tile .front,
.tile .back {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.6s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.tile .back {
  transform: rotateY(180deg);
}
.tile.revealed .front {
  transform: rotateY(180deg);
}
.tile.revealed .back {
  transform: rotateY(0deg);
}
</style>
