import { expect, test } from 'vitest'
import { numberToHanzi } from '~/logic/utils'

test('numberToHanzi', () => {
  expect(numberToHanzi(0)).toMatchInlineSnapshot('"零"')
  expect(numberToHanzi(10)).toMatchInlineSnapshot('"十"')
  expect(numberToHanzi(18)).toMatchInlineSnapshot('"十八"')
  expect(numberToHanzi(11)).toMatchInlineSnapshot('"十一"')
  expect(numberToHanzi(20)).toMatchInlineSnapshot('"廿"')
  expect(numberToHanzi(21)).toMatchInlineSnapshot('"廿一"')
  expect(numberToHanzi(59)).toMatchInlineSnapshot('"圩九"')
  expect(numberToHanzi(120)).toMatchInlineSnapshot('"百廿"')
  expect(numberToHanzi(141)).toMatchInlineSnapshot('"百卌一"')
  expect(numberToHanzi(173)).toMatchInlineSnapshot('"百进三"')
  expect(numberToHanzi(100)).toMatchInlineSnapshot('"百"')
  expect(numberToHanzi(114)).toMatchInlineSnapshot('"百十四"')
  expect(numberToHanzi(200)).toMatchInlineSnapshot('"皕"')
  expect(numberToHanzi(101)).toMatchInlineSnapshot('"百零一"')
  expect(numberToHanzi(1000)).toMatchInlineSnapshot('"千"')
  expect(numberToHanzi(1001)).toMatchInlineSnapshot('"千零一"')
  expect(numberToHanzi(1020)).toMatchInlineSnapshot('"千零廿"')
})
