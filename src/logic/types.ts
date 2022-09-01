import type { SocketRole } from '~/state'

export type MatchType = 'exact' | 'misplaced' | 'none' | 'deleted'

export type InputMode = 'py' | 'zy' | 'sp'

export type Topic = 'chengyu4' | 'shici5' | 'shici7'

export enum ETriesMode {
  Normal = 0, // 默认模式
  Heart = 1, // 爱心模式
  Custom = 2, // 自定义模式
}

export enum EHintLevel {
  none = 0,
  ziyin = 1,
  pianpang = 2,
  zixing = 3,
}

export interface ParsedChar {
  char: string
  _1: string
  _2?: string
  _3?: string
  parts: string[]
  yin: string
  tone: number
}

export interface MatchResult {
  char: MatchType
  _1: MatchType
  _2: MatchType
  _3: MatchType
  tone: MatchType
}

export interface TriesMeta {
  id?: string// 题目唯一 id
  answer?: boolean
  start?: number
  end?: number
  duration?: number
  failed?: boolean
  passed?: boolean
  tries?: string[]
  hint?: boolean
  hintLevel?: EHintLevel
  strict?: boolean
  sent?: boolean
  topic?: Topic // 话题
  dayNo?: number // 第几天
  mode?: ETriesMode // 模式
}

export interface EPlayer {
  name: string
  type: SocketRole
  id?: string
  joinTime?: number
}
