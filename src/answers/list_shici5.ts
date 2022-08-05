/**
 * SPOILERS
 *
 * This file contains the list of answers for the game. It's not recommended to continue reading this file.
 *
 * 剧透警告
 *
 * 该文件包含了游戏的[五言诗词]答案列表。不建议继续阅读。
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
  ...Array.from({ length: 2 }, () => []),
  ...seedShuffle([
    ['夕阳无限好', '夕'],
    ['晚来天欲雪', '雪'],
    ['大漠沙如雪', '雪'],
    ['欲穷千里目', '目'],
    ['青山独归远', '山'],
    ['低头思故乡', '乡'],
    ['孤云独去闲', '云'],
    ['手可摘星辰', '星'],
    ['不敢高声语', '声'],
    ['海内存知己', '海'],
    ['白毛浮绿水', '绿'],
    ['随风潜入夜', '风'],
    ['迢迢牵牛星', '星'],
    ['国破山河在', '国'],
    ['处处闻啼鸟', '鸟'],
    ['野火烧不尽', '火'],
    ['夜静春山空', '山'],
    ['春风花草香', '花'],
    ['飞雪迎春到', '春'],
    ['把酒问青天', '酒'],
    ['恰同学少年', '少'],
    ['月黑雁飞高', '雁'],
    ['采菊东篱下', '菊'],
    ['青山郭外斜', '山'],
    ['草盛豆苗稀', '豆'],
    ['烽火连三月', '火'],
    ['兰泽多芳草', '草'],
    ['久在樊笼里', '笼'],
    ['乾坤日夜浮', '日'],
  ], '2022-08'),
])

export const answers_shici5: string[][] = [
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
  answers_shici5.forEach((a, i) => {
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
