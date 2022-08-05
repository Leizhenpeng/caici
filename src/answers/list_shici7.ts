/**
 * SPOILERS
 *
 * This file contains the list of answers for the game. It's not recommended to continue reading this file.
 *
 * 剧透警告
 *
 * 该文件包含了游戏的[七言诗词]答案列表。不建议继续阅读。
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

import { seedShuffle } from './utils'

function prepare<T>(len: number, arr: T[]) {
  if (import.meta.hot && arr.length !== len)
    throw new Error(`expect array length ${arr.length} to be ${len}`)
  return arr
}

export const _PRE = prepare(1, [[]])

export const _2022_JAN = prepare(31, [...Array.from({ length: 31 }, () => [])])
export const _2022_FEB = prepare(28, [...Array.from({ length: 28 }, () => [])])
export const _2022_MARCH = prepare(31, [...Array.from({ length: 31 }, () => [])])
export const _2022_APRIL = prepare(30, [...Array.from({ length: 30 }, () => [])])
export const _2022_MAY = prepare(31, [...Array.from({ length: 31 }, () => [])])
export const _2022_JUNE = prepare(30, [...Array.from({ length: 30 }, () => [])])
export const _2022_JULY = prepare(31, [...Array.from({ length: 31 }, () => [])])

export const _2022_AUG = prepare(31, [
  ...seedShuffle([
    ['春江花朝秋月夜'],
    ['醉卧沙场君莫笑'],
    ['同是天涯沦落人'],
    ['一骑红尘妃子笑'],
    ['在天愿作比翼鸟'],
    ['绿杨阴里白沙堤'],
    ['却话巴山夜雨时'],
    ['日暮聊为梁甫吟'],
    ['艰难苦恨繁霜鬓'],
    ['庄生晓梦迷蝴蝶'],
    ['小楼昨夜又东风'],
    ['西当太白有鸟道'],
    ['千呼万唤始出来'],
    ['安能辨我是雄雌'],
    ['我寄愁心与明月'],
    ['直挂云帆济沧海'],
    ['日暮乡关何处是'],
    ['安得广厦千万间'],
    ['忽如一夜春风来'],
    ['山回路转不见君'],
    ['到乡翻似烂柯人'],
    ['心忧炭贱愿天寒'],
    ['乱花渐欲迷人眼'],
    ['提携玉龙为君死'],
    ['东风不与周郎便'],
    ['春蚕到死丝方尽'],
    ['长烟落日孤城闭'],
    ['无可奈何花落去'],
    ['自缘身在最高层'],
    ['老夫聊发少年狂'],
    ['柳暗花明又一村'],
  ], '2022-08'),
])

export const answers_shici7: string[][] = [
  ..._PRE,
  ..._2022_JAN,
  ..._2022_FEB,
  ..._2022_MARCH,
  ..._2022_APRIL,
  ..._2022_MAY,
  ..._2022_JUNE,
  ..._2022_JULY,
  ..._2022_AUG,
]

// eslint-disable-next-line no-console
// console.log('import.meta.hot', import.meta)
// duplicated check
if (import.meta.hot) {
  // const { checkValidIdiom } = await import('../logic')
  const map = new Map<string, number>()
  answers_shici7.forEach((a, i) => {
    if (!a[0])
      return
    if (!map.has(a[0]))
      map.set(a[0], i)
    else
      throw new Error(`Word ${a[0]} is duplicated at ${map.get(a[0])}`)
    if (a[1] && !a[0].includes(a[1]))
      throw new Error(`Hint ${a[1]} is not included in ${a[0]}`)
    // if (!checkValidIdiom(a[0], true))
    //   throw new Error(`${a[0]} is not a valid idiom`)
  })
}