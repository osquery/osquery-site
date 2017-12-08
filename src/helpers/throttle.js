const throttle = (fn, delay = 50) => {
  let lastCall = 0

  return (...args) => {
    const now = new Date().getTime()

    if (now - lastCall < delay) {
      return
    }

    lastCall = now

    return fn(...args)
  }
}

export default throttle
