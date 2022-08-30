<!-- eslint-disable no-console -->
<script setup lang="ts">
import { filterNonChineseChars } from '@hankit/tools'
import { t } from '~/i18n'
import type { Topic } from '~/logic'
import { TRIES_LIMIT, checkValidIdiom } from '~/logic'
import { BroadcastPlayerTrysRefresh, UploadPlayeTry } from '~/socket-io'
import {
  UserTry, breakpoints,
  isFailed,
  isMobile, mySocket,
  showCheatSheet,
  showFailed,
  showHelp,
  showHint, startShowConfetti, togetherUserTrysWords, totalTopics, useMask,
} from '~/state'
import { TogetherGameMode, currentMeta, markStart, nickName, topicNow, useHint, useStrictMode } from '~/storage'
const props = withDefaults(defineProps<{
  topicId?: number
  gameMode?: TogetherGameMode
  answerInRoom?: string
  playInitTrys?: UserTry[]
}>(), {
  topicId: 1,
  gameMode: TogetherGameMode.COMPETITION,
})

const playerTrys = ref<UserTry[]>(props.playInitTrys || [])
const chooseTopic = computed(() => {
  return totalTopics.value!.find(
    topic => topic.id === props.topicId)
})

const wordLength = computed(() => {
  return chooseTopic.value?.wordLength || 5
})

watch(() => {
  console.log('chooseTopic', chooseTopic)
  return chooseTopic
}, () => {
  topicNow.value = chooseTopic.value?.nameCode as Topic
}, {
  deep: true,
  immediate: true,
})
const el = ref<HTMLInputElement>()
const input = ref('')
const inputValue = ref('')
const showToast = autoResetRef(false, 1000)
const shake = autoResetRef(false, 500)

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
function enter() {
  if (input.value.length !== wordLength.value)
    return
  if (!checkValidIdiom(input.value, useStrictMode.value)) {
    showToast.value = true
    shake.value = true
    return false
  }
  if (currentMeta.value.strict == null)
    currentMeta.value.strict = useStrictMode.value

  mySocket.value?.emit(UploadPlayeTry,
    input.value,
  )
  // playerTrys.value.push(input.value)
  input.value = ''
  inputValue.value = ''
}
// function reset() {
//   playerTrys.value = []
//   currentMeta.value = {}
//   input.value = ''
//   inputValue.value = ''
// }
function handleInput(e: Event) {
  const el = (e.target! as HTMLInputElement)
  input.value = filterNonChineseChars(el.value).slice(0, wordLength.value)
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

const gameModeTitle = computed(() => {
  switch (props.gameMode) {
    case TogetherGameMode.COMPETITION:
      return '限时轮猜'
    case TogetherGameMode.COOPERATION:
      return '默契合猜'
  }
})
function formatUserTryFromServer(tryInfo: string) {
  const [genId, nickName, tryWord, tryTime, ifPass] = tryInfo.split(',')
  return new UserTry(~~genId, nickName, tryWord, tryTime, ~~ifPass)
}
mySocket.value?.on(BroadcastPlayerTrysRefresh, (palyerTrysFromServer: Array<string>) => {
  const _parsered = palyerTrysFromServer.map(formatUserTryFromServer)
  console.log('playerTrys', _parsered)
  playerTrys.value = _parsered
})

const ifHavePassed = computed(() => {
  return playerTrys.value.some(tryInfo => tryInfo.ifPass)
})
watch(playerTrys, () => {
  togetherUserTrysWords.value = playerTrys.value.map(tryInfo => tryInfo.tryWord as string)
}, {
  deep: true,
  immediate: true,
})

watch(ifHavePassed, (ifHavePassed) => {
  if (ifHavePassed)
    startShowConfetti()
}, {
  immediate: true,
})

const isHaveFinished = computed(() => {
  return ifHavePassed.value
})

const isFinishedDelay = debouncedRef(isHaveFinished, 800)
</script>

<template>
  <div>
    <p text-center w-full font-serif>
      <b>{{ gameModeTitle }}·{{ chooseTopic?.name }}</b>
    </p>
    <div v-show="!showHelp" flex="~ col between" pt4 items-centerl>
      <WordBlocks
        v-for="eachTry, index of playerTrys" :key="index" :word="eachTry.tryWord!" :revealed="true" :show-player="true"
        :word-length="wordLength" :player-nick="eachTry.nickName" :answer="answerInRoom" @click="focus()"
      />

      <!-- //猜测不出查看正确答案~ -->
      <!-- <template v-if="currentMeta.answer">
        <div my4>
          <div font-serif p2>
            {{ t('correct-answer') }}
          </div>
          <WordBlocks :word="answer.word" :show-player="true" :word-length="wordLength" />
        </div>
      </template> -->

      <WordBlocks
        v-if="!isHaveFinished" :word-length="wordLength" :show-player="true" :player-nick="nickName" :class="{ shake }" :word="input"
        :active="true" @click="focus()"
      />

      <div mt-1 />

      <Transition name="fade-out">
        <div v-if="!isHaveFinished" flex="~ col gap-2" items-center>
          <div relative border="2 base rounded-0">
            <input
              ref="el" v-model="inputValue" bg-transparent w-86 p3 outline-none text-center type="text" autocomplete="false"
              :placeholder="t('input-placeholder')" :disabled="isHaveFinished" :class="{ shake }" @input="handleInput" @keydown.enter="enter"
            >
            <div
              absolute top-0 left-0 right-0 bottom-0 flex="~ center" bg-base transition-all duration-300 text-mis pointer-events-none
              :class="showToast ? '' : 'op0 translate-y--1'"
            >
              <span tracking-1 pl1>
                {{ t('invalid-idiom') }}
              </span>
            </div>
            <div absolute top-0 right-0 bottom-0 mya px3 flex="~ center" icon-btn op-60 @click="magicDelete">
              <div i-carbon-magic-wand-filled />
            </div>
          </div>
          <button mt3 btn p="x6 y2" :disabled="input.length !== wordLength" @click="enter">
            {{ t('ok-spaced') }}
          </button>
          <div v-if="playerTrys.length > 4 && !isFailed" op50>
            {{ t('tries-rest', TRIES_LIMIT - playerTrys.length) }}
          </div>
          <button v-if="isFailed" square-btn @click="showFailed = true">
            <div i-mdi-emoticon-devil-outline /> {{ t('view-answer') }}
          </button>

          <div flex="~ between" mt4 w-full flex-row-reverse :class="isHaveFinished ? 'op0! pointer-events-none' : ''">
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
        <div v-if="isFinishedDelay && isHaveFinished">
          <ResultFooter />
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
