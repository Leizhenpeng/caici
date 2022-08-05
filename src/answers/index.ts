import { getHint } from '../logic'
import { answers_chengyu4 } from './list_chengyu4'
import { answers_shici5 } from './list_shici5'
import { answers_shici7 } from './list_shici7'
import { topicNow } from '~/storage'

export function getAnswerOfDay(day: number, type = topicNow.value) {
  let answersByTopic = [['']]
  if (type === 'chengyu4')
    answersByTopic = answers_chengyu4

  else if (type === 'shici5')
    answersByTopic = answers_shici5

  else if (type === 'shici7')
    answersByTopic = answers_shici7

  const [word = '', hint = ''] = answersByTopic[day] || []

  return {
    word,
    hint: hint || getHint(word),
  }
}
