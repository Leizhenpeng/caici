const pop_bottom = {
  initial: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  leave: {
    y: -100,
    opacity: 0.1,
  },
}

export const customMotion = {
  'pop-bottom': pop_bottom,
}
