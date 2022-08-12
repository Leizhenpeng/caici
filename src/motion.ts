const right_slide_in = {
  initial: {
    x: 200,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 250, damping: 25, mass: 0.5 },
  },
}

export const customMotion = {
  'right-slide-in': right_slide_in,
}
