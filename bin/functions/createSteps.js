const sh = require('kool-shell')

function createSteps (steps = []) {
  let step = 0
  const maxSteps = steps.length

  function getCurrent () {
    return step
  }

  function next (...args) {
    step++
    if (step <= maxSteps) {
      sh.step(step, maxSteps, sh.colors['gray'](steps[step - 1]))
    }
    return Promise.resolve(...args)
  }

  return {
    getCurrent,
    next
  }
}

module.exports = createSteps
