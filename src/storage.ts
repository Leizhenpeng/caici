import type { SpMode } from '@hankit/tools'
import { preferZhuyin, t } from './i18n'
import { dayNo } from './state'
import type { InputMode, Topic, TriesMeta } from './logic'

export const legacyTries = useStorage<Record<number, string[]>>('caici-tries', {})

export const history = useStorage<Record<number, TriesMeta>>('caici-tries-meta', {})
export const initialized = useStorage('caici-initialized', false)

export const inputMode = useStorage<InputMode>('caici-mode', preferZhuyin ? 'zy' : 'py')
export const spMode = useStorage<SpMode>('caici-sp-mode', 'sougou')
export const colorblind = useStorage('caici-colorblind', false)
export const useNoHint = useStorage('caici-hard-mode', false)
export const useNumberTone = useStorage('caici-number-tone', false)
export const useCheckAssist = useStorage('caici-check-assist', false)
export const useStrictMode = useStorage('caici-strict', true)
export const acceptCollecting = useStorage('caici-accept-collecting', true)
export const topicNow = useStorage<Topic>('caici-topic-now', 'chengyu4')

export const meta = computed<TriesMeta>({
  get() {
    if (!(dayNo.value in history.value))
      history.value[dayNo.value] = {}
    return history.value[dayNo.value]
  },
  set(v) {
    history.value[dayNo.value] = v
  },
})

export const tries = computed<string[]>({
  get() {
    if (!meta.value.tries)
      meta.value.tries = []
    return legacyTries.value[dayNo.value] || meta.value.tries
  },
  set(v) {
    meta.value.tries = v
  },
})

export function markStart() {
  if (meta.value.end)
    return
  if (!meta.value.start)
    meta.value.start = Date.now()
}

export function markEnd() {
  if (meta.value.end)
    return

  if (!meta.value.duration)
    meta.value.duration = 0

  meta.value.end = Date.now()
  if (meta.value.start)
    meta.value.duration += meta.value.end - meta.value.start
}

export function pauseTimer() {
  if (meta.value.end)
    return

  if (!meta.value.duration)
    meta.value.duration = 0

  if (meta.value.start) {
    meta.value.duration += Date.now() - meta.value.start
    meta.value.start = undefined
  }
}

export const gamesCount = computed(() => Object.values(history.value).filter(m => m.passed || m.answer || m.failed).length)
export const passedTries = computed(() => Object.values(history.value).filter(m => m.passed))
export const passedCount = computed(() => passedTries.value.length)
export const noHintPassedCount = computed(() => Object.values(history.value).filter(m => m.passed && !m.hint).length)
export const historyTriesCount = computed(() => Object.values(history.value).filter(m => m.passed || m.answer || m.failed).map(m => m.tries?.length || 0).reduce((a, b) => a + b, 0))

export const triesCount = computed(() => tries.value.length)
export const averageDurations = computed(() => {
  const items = Object.values(history.value).filter(m => m.passed && m.duration)
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
