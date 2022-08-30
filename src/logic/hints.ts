import HintsRaw from '../data/hintTip.txt?raw'

export const HintList = HintsRaw.split('\n').map(i => i.trim()).filter(Boolean)
export const getRandomHint = (() => {
  const index = Math.floor(Math.random() * HintList.length)
  return HintList[index]
})()
