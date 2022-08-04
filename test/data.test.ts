import { expect, it } from 'vitest'
import { getPinyin } from '../src/logic'
import { seedShuffle } from '~/answers/utils'

it('getPinyin', () => {
  expect(getPinyin('自怨自艾')).toMatchInlineSnapshot(`
    [
      "zi4",
      "yvan4",
      "zi4",
      "yi4",
    ]
  `)
})

it('seedShuffle', () => {
  expect(seedShuffle([1, 2, 3, 4, 5], '2')).toEqual(seedShuffle([1, 2, 3, 4, 5], '2'))
  expect(seedShuffle([1, 2, 3, 4, 5], '2222')).not.to.equal(seedShuffle([1, 2, 3, 4, 5], '2'))
})
