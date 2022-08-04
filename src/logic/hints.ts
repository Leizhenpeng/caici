import HintsRaw from '../data/hintTip.txt?raw'

export const HintList = HintsRaw.split('\n').map(i => i.trim()).filter(Boolean)

export const getRandomHint = () => {
  const index = Math.floor(Math.random() * HintList.length)
  // eslint-disable-next-line no-console
  console.log('Date.now()', Date.now())
  return HintList[index]
}
