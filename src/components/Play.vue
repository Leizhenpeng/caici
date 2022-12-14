<script setup lang="ts">
import { filterNonChineseChars } from '@hankit/tools'
import { useMessage } from 'naive-ui'
import { t } from '~/i18n'
import { TRIES_LIMIT, checkDoor, checkValidIdiom } from '~/logic'
import {
  answer, breakpoints, dayNo, dayNoHanzi,
  ifShici,
  isDev,
  isFailed,
  isFinished,
  isMobile,
  isPassed,
  nowTopicTitleShort,
  nowWorkDetail,
  showCheatSheet,
  showFailed,
  showHelp,
  showHint,
  startShowConfetti,
  sumRejectByStrictMode,
  useMask,
} from '~/state'
import { currentMeta, markStart, topicNow, tries, useHint, useStrictMode, wordLengthNow } from '~/storage'
const el = ref<HTMLInputElement>()
const input = ref('')
const inputValue = ref('')
const showToast = autoResetRef(false, 1000)
const shake = autoResetRef(false, 500)
const isFinishedDelay = debouncedRef(isFinished, 800)
const ifBtnOnLoading = ref(false)
function resetInputValue() {
  inputValue.value = ''
  input.value = ''
}

watch(
  topicNow,
  () => {
    resetInputValue()
    useMask.value = false
  },
)
const message = useMessage()
whenever(
  () => {
    return sumRejectByStrictMode.value > 2
  },
  () => {
    message.warning('设置面版中，允许关闭对输入词语的语法约束', { duration: 3000 })
    sumRejectByStrictMode.value = 0
  },
)
async function enter() {
  if (ifBtnOnLoading.value)
    return
  if (input.value.length !== wordLengthNow.value)
    return
  ifBtnOnLoading.value = true
  checkDoor(topicNow.value, input.value, useStrictMode.value).then(
    (out) => {
      const isValid = out
      if (!isValid) {
        showToast.value = true
        shake.value = true
        sumRejectByStrictMode.value++
        return
      }
      if (currentMeta.value.strict == null)
        currentMeta.value.strict = useStrictMode.value
      tries.value.push(input.value)
      input.value = ''
      inputValue.value = ''
    },
  ).finally(
    () => {
      ifBtnOnLoading.value = false
    },
  )
}
function reset() {
  tries.value = []
  currentMeta.value = {}
  input.value = ''
  inputValue.value = ''
}
function handleInput(e: Event) {
  const el = (e.target! as HTMLInputElement)
  input.value = filterNonChineseChars(el.value).slice(0, wordLengthNow.value)
  markStart()
}
function focus() {
  el.value?.focus()
}
function hint() {
  // currentMeta.value.hint = true
  if (!currentMeta.value.hintLevel)
    currentMeta.value.hintLevel = 0
  showHint.value = true
}
function sheet() {
  showCheatSheet.value = !showCheatSheet.value
}

watchEffect(() => {
  if (showHelp.value)
    return
  if (isMobile)
    return
  if (breakpoints.lg)
    focus()
})

watchEffect(() => {
  if (isFailed.value && !currentMeta.value.failed) {
    currentMeta.value.failed = true
    setTimeout(() => {
      showFailed.value = true
    }, 1200)
  }
})

function magicDelete() {
  resetInputValue()
  focus()
}
watch(isPassed, () => {
  if (isPassed.value)
    startShowConfetti()
}, {
  immediate: true,
})
</script>

<template>
  <div>
    <p text-center w-full font-serif mb4>
      <b>{{ dayNoHanzi }}·{{ nowTopicTitleShort }}</b>
    </p>
    <div v-show="!showHelp" flex="~ col between" items-centerl>
      <WordBlocks v-for="w, i of tries" :key="i" :word="w" :revealed="true" :word-length="wordLengthNow" @click="focus()" />

      <template v-if="currentMeta.answer">
        <div my4>
          <div font-serif p2>
            {{ t('correct-answer') }}
          </div>
          <WordBlocks :word="answer.word" :word-length="wordLengthNow" />
        </div>
      </template>

      <WordBlocks
        v-if="!isFinished"
        :word-length="wordLengthNow" :class="{ shake }" :word="input" :active="true"
        @click="focus()"
      />

      <div mt-1 />

      <Transition name="fade-out">
        <div v-if="!isFinished" flex="~ col gap-2" items-center>
          <div relative border="2 base rounded-0">
            <input
              ref="el" v-model="inputValue" bg-transparent w-86 p3 outline-none text-center type="text" autocomplete="false"
              :placeholder="t('input-placeholder')" :disabled="isFinished" :class="{ shake }" @input="handleInput" @keydown.enter="enter"
            >
            <div
              absolute top-0 left-0 right-0 bottom-0 flex="~ center" bg-base transition-all duration-300 text-warn pointer-events-none
              :class="showToast ? '' : 'op0 translate-y--1'"
            >
              <span v-if="ifShici" tracking-1 pl1>
                {{ t('invalid-shici') }}
              </span>
              <span v-else tracking-1 pl1>
                {{ t('invalid-idiom') }}

              </span>
            </div>
            <div absolute top-0 right-0 bottom-0 mya px3 flex="~ center" icon-btn op-60 @click="magicDelete">
              <div i-carbon-magic-wand-filled />
            </div>
          </div>

          <button mt3 btn p="x6 y2" relative flex="~ row center" :disabled="input.length !== wordLengthNow" @click="enter">
            <div v-show="ifBtnOnLoading" class="loading" mr-1 />
            {{ t('ok-spaced') }}
          </button>

          <div v-if="tries.length > 4 && !isFailed" op50>
            {{ t('tries-rest', TRIES_LIMIT - tries.length) }}
          </div>
          <button v-if="isFailed" square-btn @click="showFailed = true">
            <div i-mdi-emoticon-devil-outline /> {{ t('view-answer') }}
          </button>

          <div flex="~ between" mt4 w-full flex-row-reverse :class="isFinished ? 'op0! pointer-events-none' : ''">
            <button mx2 icon-btn text-base pb2 gap-1 flex="~ center" @click="sheet()">
              <div i-carbon-grid /> {{ t('cheatsheet') }}
            </button>
            <button v-if="useHint" mx2 icon-btn text-base pb2 gap-1 flex="~ center" @click="hint()">
              <div i-carbon-idea /> {{ t('hint') }}
            </button>
          </div>
        </div>
      </Transition>
      <Transition name="fade-in">
        <div v-if="isFinishedDelay && isFinished">
          <ResultFooter />

          <div flex="~ row center" items-center>
            <ShareButton m4 />
            <ToggleMask :hint="true" />
          </div>
          <div v-if="nowWorkDetail?.objectId && ifShici && currentMeta?.workId">
            <div h-1px w-10 border="t base" mt4 mb6 mxa />
            <div pb2 op50>
              {{ t('shiciFromTitle') }}
            </div>
            <CardMini
              :key="nowWorkDetail?.objectId" my-4 :title="nowWorkDetail?.title" :answer="answer.word"
              :content="nowWorkDetail?.content" :layout="nowWorkDetail?.layout"
            />
          </div>
          <Countdown />
        </div>
      </Transition>

      <!-- <template v-if="isDev">
        <div h-20 />
        <div op50 mb-2>
          测试用
        </div>
        <div flex gap2>
          <a class="btn" :href="`/?dev=hey&d=${dayNo - 1}`">
            上一天
          </a>
          <button class="btn" @click="reset">
            重置
          </button>
          <a class="btn" :href="`/?dev=hey&d=${dayNo + 1}`">
            下一天
          </a>
        </div>
      </template> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: relative;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top-color: #00000010;
  border-right-color: #00000010;
  border-bottom-color: #00000010;
  border-radius: 100%;
  animation: circle infinite 0.75s linear;
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

