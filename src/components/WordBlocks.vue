<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ifMinFont5 as ifMinFont5_, ifMinFont7 as ifMinFont7_, parseWord, parsedAnswer, showHintLevelTip, testAnswer, answer as todayAnswer } from '~/state'
import { wordLengthNow } from '~/storage'
const props = withDefaults(
  defineProps<{
    word: string
    wordLength?: number
    revealed?: boolean
    answer?: string
    animate?: boolean
    active?: boolean
    forceFour?: boolean // 强制 4字, 用在多人成语口令中
    showPlayer?: boolean
    playerNick?: string
    hintLevel?: number
  }>(), {
    wordLength: wordLengthNow.value,
    animate: true,
    forceFour: false,
    showPlayer: false,
    playerNick: '无名氏',
    hintLevel: 0,
  },
)
const wordLengthUse = computed(() => {
  return props.forceFour ? 4 : props.wordLength
})

// watch(wordLengthUse, () => {
//   console.log('wordLength', wordLengthUse)
// }, {
//   immediate: true,
// })
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

const hintColorPools = ref([
  'bg-#5bae23',
  'bg-#f1ca17',
  'bg-#c21f30',
])
const transHintToColor = computed(() => {
  return hintColorPools.value[props.hintLevel]
})
function openHintLevlTip() {
  showHintLevelTip.value = true
}

function addDisappear(el: HTMLElement) {
  el?.classList.add('holeOut', 'op-30')
}
function addAppear(el: HTMLElement) {
  el?.classList.add('boingInUp')
}
const wb = ref()
async function addFlip() {
  for (let i = 0; i <= wb.value.children.length; i++) {
    const element = wb.value.children[i]
    await new Promise(resolve => setTimeout(resolve, Math.random() * 60 + 40))
    addDisappear(element.querySelector('.front'))
    addAppear(element.querySelector('.back'))
  }
}
onMounted(() => {
  watchEffect(() => {
    if (props.revealed) {
      setTimeout(() => {
        flip.value = true
        addFlip()
      }, Math.random() * 100)
    }
  })
})
</script>

<template>
  <div ref="wb" flex>
    <div
      v-if="showPlayer" op70 mt1 m1 max-w-3 text-sm scale-90 leading-4 font-serif flex="~ col center" cursor-pointer
      @click.stop="openHintLevlTip"
    >
      <div v-for="item, index in playerNick" :key="index">
        {{ item }}
      </div>
      <div id="breathing-button">
        <div i-carbon-circle-filled w-3 pl-3 :class="transHintToColor" />
      </div>
    </div>
    <div
      v-for="c, i in parseWord(word.padEnd(wordLengthUse, ' '), answer || todayAnswer.word)" :key="i" w-20 h-20 m1 class="tile" :class="[
        flip ? 'revealed' : '',
        ifMinFont5 ? '!w-16 !h-18' : '',
        ifMinFont7 ? '!w-11 !h-13' : '',
      ]"
    >
      <template v-if="animate">
        <CharBlock class="front magictime" :char="c" :active="active" :force-four="forceFour" />
        <CharBlock class="back magictime" :char="c" :answer="result[i]" :force-four="forceFour" />
      </template>
      <template v-else>
        <CharBlock :char="c" :answer="result[i]" :active="active" :force-four="forceFour" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.tile {
  user-select: none;
  position: relative;
}

/* //not show */
.not-show {
  display: none;
}
.tile .front,
.tile .back {
  position: absolute;
  top: 0;
  left: 0;
}

#breathing-button {
  -webkit-animation: breathing 5s ease-out infinite normal;
  animation: breathing 5s ease-out infinite normal;
}

@-webkit-keyframes breathing {
  0% {
    -webkit-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
  }

  25% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  70% {
    -webkit-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
  }

  100% {
    -webkit-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
  }
}

@keyframes breathing {
  0% {
    -webkit-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
  }

  25% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  70% {
    -webkit-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
  }

  100% {
    -webkit-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
  }
}
</style>
