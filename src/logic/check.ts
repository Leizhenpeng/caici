import { ifShici } from '../state'
import { topicNow } from '../storage'
import { getIdiom } from './idioms'
import { judgeTryIfShici } from '~/api'

export function filterNonChineseChars(input: string, cutLength = 4) {
  return Array.from(input)
    .filter(i => /\p{Script=Han}/u.test(i))
    .slice(0, cutLength)
    .join('')
}

export function checkValidIdiom(word: string, strict = false) {
  if (!strict)
    return true
  return !!getIdiom(word)
}

export async function checkVaildShici(word: string, strict = false) {
  if (!strict)
    return true
  const judgeOut = await judgeTryIfShici(word)
  return judgeOut.isShici
}

export async function checkDoor(topic: string, word: string, strict = false) {
  if (!strict)
    return true
  if (topic === 'shici5' || topic === 'shici7')
    return checkVaildShici(word, strict)
  return checkValidIdiom(word, strict)
}
