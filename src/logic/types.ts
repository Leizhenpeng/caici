export type MatchType = 'exact' | 'misplaced' | 'none' | 'deleted'

export type InputMode = 'py' | 'zy' | 'sp'

export type Topic = 'chengyu4' | 'shici5' | 'shici7'
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
  answer?: boolean
  start?: number
  end?: number
  duration?: number
  failed?: boolean
  passed?: boolean
  tries?: string[]
  hint?: boolean
  hintLevel?: number
  strict?: boolean
  sent?: boolean
}
