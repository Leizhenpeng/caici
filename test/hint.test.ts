import { expect, it } from 'vitest'
import { HintList, getRandomHint } from './../src/logic/hints'

it(
  'getRandomHint',
  () => {
    expect(getRandomHint()).toBeDefined()
    expect(getRandomHint()).toSatisfy(
      (r: string) => {
        return r.endsWith('。')
      },
    )
  },
)

it(
  'getFirstHint',
  () => {
    expect(HintList).toBeDefined()
    expect(HintList).toSatisfy(
      (r: string[]) => {
        return r.length > 0
      },
    )
    expect(HintList[0]).toEqual('把时间用在思考上是最能节省时间的事情。')
  },
)
