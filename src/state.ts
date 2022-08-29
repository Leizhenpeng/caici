import { breakpointsTailwind } from '@vueuse/core'
import type { Socket } from 'socket.io-client'
import { getAnswerOfDay } from './answers'
import type { AllTopicResponse } from './api'
import { t } from './i18n'
import type { MatchType, ParsedChar } from './logic'
import {
  START_DATE,
  TRIES_LIMIT,
  parseWord as _parseWord,
  testAnswer as _testAnswer, checkPass, getHint, isDstObserved, numberToHanzi,
} from './logic'
import {
  useNumberTone as _useNumberTone,
  currentMeta,
  inputMode,
  spMode,
  topicNow, tries, useStrictMode,
  wordLengthNow,
} from './storage'

export const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
export const isMobile = isIOS || /iPad|iPhone|iPod|Android|Phone|webOS/i.test(navigator.userAgent)
export const breakpoints = useBreakpoints(breakpointsTailwind)

export const now = useNow({ interval: 1000 })
export const isDark = useDark()
export const showHint = ref(false)
export const showSettings = ref(false)
export const showHelp = ref(false)
export const showShare = ref(false)
export const showTogetherShare = ref(false)
export const showFailed = ref(false)
export const showDashboard = ref(false)
export const showVariants = ref(false)
export const showCheatSheet = ref(false)
export const showPrivacyNotes = ref(false)
export const showShareDialog = ref(false)
export const useMask = ref(false)
export const showMultiplayer = ref(true) // TODO:change false
export const totalTopics = ref<AllTopicResponse[]>()
export const togetherWords = ref('')

export const useNumberTone = computed(() => {
  if (inputMode.value === 'sp')
    return true

  if (inputMode.value === 'zy')
    return false

  return _useNumberTone.value
})

const params = new URLSearchParams(window.location.search)
export const isDev = import.meta.hot || params.get('dev') === 'hey'
export const isDevPro = import.meta.env.MODE === 'development'
export const daySince = useDebounce(computed(() => {
  // Adjust date for daylight saving time, assuming START_DATE is not in DST
  const adjustedNow = isDstObserved(now.value) ? new Date(+now.value + 3600000) : now.value
  return Math.floor((+adjustedNow - +START_DATE) / 86400000)
}))
export const dayNo = ref(+(params.get('d') || daySince.value))
export const dayNoHanzi = computed(() => `${numberToHanzi(dayNo.value)}日`)
export const answer = computed(() =>
  params.get('word')
    ? {
        word: params.get('word')!,
        hint: getHint(params.get('word')!),
      }
    : getAnswerOfDay(dayNo.value),
)

export const hint = computed(() => answer.value.hint)
export const parsedAnswer = computed(() => parseWord(answer.value.word))

export const isPassed = computed(() => currentMeta.value.passed || (tries.value.length && checkPass(testAnswer(parseWord(tries.value[tries.value.length - 1])))))
export const isFailed = computed(() => !isPassed.value && tries.value.length >= TRIES_LIMIT)
export const isFinished = computed(() => isPassed.value || currentMeta.value.answer)

export function parseWord(word: string, _ans = answer.value.word, mode = inputMode.value, spM = spMode.value) {
  return _parseWord(word, _ans, mode, spM)
}

export function testAnswer(word: ParsedChar[], ans = parsedAnswer.value) {
  return _testAnswer(word, ans)
}

export const parsedTries = computed(() => tries.value.map((i) => {
  const word = parseWord(i)
  const result = testAnswer(word)
  return {
    word,
    result,
  }
}))

export function getSymbolState(symbol?: string | number, key?: '_1' | '_2' | 'tone') {
  const results: MatchType[] = []
  for (const t of parsedTries.value) {
    for (let i = 0; i < wordLengthNow.value; i++) {
      const w = t.word[i]
      const r = t.result[i]
      if (key) {
        if (w[key] === symbol)
          results.push(r[key])
      }
      else {
        if (w._1 === symbol)
          results.push(r._1)

        if (w._2 === symbol)
          results.push(r._2)

        if (w._3 === symbol)
          results.push(r._3)
      }
    }
  }
  if (results.includes('exact'))
    return 'exact'

  if (results.includes('misplaced'))
    return 'misplaced'

  if (results.includes('none'))
    return 'none'

  return null
}

// 是否是移动端+五言诗
export const ifMinFont5 = computed(() => {
  const lg = breakpoints.lg
  return wordLengthNow.value === 5 && (isMobile || !lg)
})

// 是否是移动端+⑦言诗
export const ifMinFont7 = computed(() => {
  const lg = breakpoints.lg
  return wordLengthNow.value === 7 && (isMobile || !lg)
})

// 获取当前话题
export const nowTopic = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return t('topic-chengyu')
    if (topicNow.value === 'shici5')
      return t('topic-wuyan')
    if (topicNow.value === 'shici7')
      return t('topic-qiyan')
    else
      return t('topic-chengyu')
  },
)
// 获取当前话题简称
export const nowTopicTitleShort = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return t('play-title-chengyu')
    if (topicNow.value === 'shici5')
      return t('play-title-wuyan')
    if (topicNow.value === 'shici7')
      return t('play-title-qiyan')
    else
      return t('play-title-chengyu')
  },
)

// 获取当前话题例子
export const nowTopicExample = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return '鹏程万里'
    if (topicNow.value === 'shici5')
      return '把酒问青天'
    if (topicNow.value === 'shici7')
      return '日照香炉生紫烟'
    else
      return '鹏程万里'
  },
)

watch(
  topicNow,
  (topic) => {
    if (topic === 'chengyu4')
      return
    if (topic === 'shici5')
      useStrictMode.value = false
    if (topic === 'shici7')
      useStrictMode.value = false
    else
      useStrictMode.value = false
  },
  {
    immediate: true,
  },
)

export const mySocket = ref<Socket>()
// console.log('this.$socket', this.$socket)
// watch(
//   showMultiplayer,
//   (value) => {
//     const socket = unref(mySocket) as Socket
//     if (value && socket && !socket!.connected)
//       socket && socket!.connect()
//     socket && socket.on('connect', () => {
//       console.log('#connected: ', socket.id)
//     })
//   },
//   {
//     immediate: true,
//   },
// )

export enum SocketRole {
  Master = 'master',
  Player = 'player',
  watcher = 'watcher',
  faker = 'faker',
}

export class UserTry {
  genId?: number
  nickName?: string
  tryWord?: string
  tryTimestamp?: string
  ifPass?: number

  constructor(genId: number, nickName: string, tryWord: string, tryTimestamp: string, ifPass: number) {
    Object.assign(this, {
      genId,
      nickName,
      tryWord,
      tryTimestamp,
      ifPass,
    })
  }
}

export const showConfetti = ref(false)

export function startShowConfetti() {
  showConfetti.value = true
  setTimeout(() => {
    showConfetti.value = false
  }, 5000)
}

