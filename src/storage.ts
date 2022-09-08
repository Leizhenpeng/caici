import type { SpMode } from '@hankit/tools'
import { nanoid } from 'nanoid'
import { preferZhuyin, t } from './i18n'
import type { InputMode, Topic, TriesMeta } from './logic'
import { ETriesMode } from './logic'
import { dayNo } from './state'
export enum TogetherGameMode {
  COOPERATION = 'COOPERATION',
  COMPETITION = 'COMPETITION',
}
export const legacyTries = useStorage<Record<number, string[]>>('caici-tries', {})

export const historyMeta = useStorage<TriesMeta[]>('caici-tries-meta', [])
export const initialized = useStorage('caici-initialized', false)

export const inputMode = useStorage<InputMode>('caici-mode', preferZhuyin ? 'zy' : 'py')
export const spMode = useStorage<SpMode>('caici-sp-mode', 'sougou')
export const colorblind = useStorage('caici-colorblind', false)
export const useHint = useStorage('caici-hint-open', true)
export const useNumberTone = useStorage('caici-number-tone', false)
export const useCheckAssist = useStorage('caici-check-assist', false)
export const useStrictMode = useStorage('caici-strict', true)
export const acceptCollecting = useStorage('caici-accept-collecting', true)
export const topicNow = useStorage<Topic>('caici-topic-now', 'chengyu4')
export const modeNow = useStorage<ETriesMode>('caici-mode-now', ETriesMode.Normal)
export const nickName = useStorage('caici-nickname', '无名氏')
export const deviceId = useStorage('caici-deviceId', '')
export const deviceIdRegister = useStorage('caici-deviceId-register', false)
export const togetherRecentTopic = useStorage('caici-together-recent-topic', 1)
export const togetherRecentGameMode = useStorage('caici-together-recent-game-mode', TogetherGameMode.COMPETITION)

export const curMetaByDayAndTopicAndMode = computed(
  () => {
    const day = dayNo.value
    const topic = topicNow.value
    const mode = modeNow.value
    return historyMeta.value.find((meta: TriesMeta) => {
      return meta.dayNo === day && meta.topic === topic && meta.mode === mode
    })
  },
)

export const currentMeta = computed<TriesMeta>({
  get() {
    const uniId = nanoid()
    if (!curMetaByDayAndTopicAndMode.value) {
      historyMeta.value.push({
        id: uniId,
        dayNo: dayNo.value,
        topic: topicNow.value,
        mode: modeNow.value,
      })
    }
    return curMetaByDayAndTopicAndMode.value
      || historyMeta.value.find(meta => meta.id === uniId)
      || {}
  },
  set(meta: TriesMeta) {
    const idx = historyMeta.value.findIndex(m => m.id === meta.id)
    if (idx > -1)
      historyMeta.value[idx] = meta
    else
      historyMeta.value.push(meta)
  },
})

export const tries = computed<string[]>({
  get() {
    if (!currentMeta.value.tries)
      currentMeta.value.tries = []

    return legacyTries.value[dayNo.value] || currentMeta.value.tries
  },
  set(v) {
    currentMeta.value.tries = v
  },
})

export function markStart() {
  if (currentMeta.value.end)
    return

  if (!currentMeta.value.start)
    currentMeta.value.start = Date.now()
}

export function markEnd() {
  if (currentMeta.value.end)
    return

  if (!currentMeta.value.duration)
    currentMeta.value.duration = 0

  currentMeta.value.end = Date.now()
  if (currentMeta.value.start)
    currentMeta.value.duration += currentMeta.value.end - currentMeta.value.start
}

export function pauseTimer() {
  if (currentMeta.value.end)
    return

  if (!currentMeta.value.duration)
    currentMeta.value.duration = 0

  if (currentMeta.value.start) {
    currentMeta.value.duration += Date.now() - currentMeta.value.start
    currentMeta.value.start = undefined
  }
}

export const gamesCount = computed(() => Object.values(historyMeta.value).filter(m => m.passed || m.answer || m.failed).length)
export const passedTries = computed(() => Object.values(historyMeta.value).filter(m => m.passed))
export const passedCount = computed(() => passedTries.value.length)
export const noHintPassedCount = computed(() => Object.values(historyMeta.value).filter(m => m.passed && !m.hint).length)
export const historyTriesCount = computed(() => Object.values(historyMeta.value).filter(m => m.passed || m.answer || m.failed).map(m => m.tries?.length || 0).reduce((a, b) => a + b, 0))

export const triesCount = computed(() => tries.value.length)
export const averageDurations = computed(() => {
  const items = Object.values(historyMeta.value).filter(m => m.passed && m.duration)
  if (!items.length)
    return 0

  const durations = items.map(m => m.duration!).reduce((a, b) => a + b, 0)
  return formatDuration(durations / items.length)
})

export function formatDuration(duration: number) {
  const ts = duration / 1000
  const m = Math.floor(ts / 60)
  const s = Math.floor(ts % 60)
  if (m)
    return m + t('minutes') + s + t('seconds')

  return s + t('seconds')
}

export const wordLengthNow = computed(() => {
  const topic = topicNow.value
  if (topic === 'chengyu4')
    return 4

  if (topic === 'shici5')
    return 5

  if (topic === 'shici7')
    return 7

  return 4
})

