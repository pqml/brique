'use strict'

function isVariableValid (val) {
  try {
    new Function('var ' + val)() // eslint-disable-line
  } catch (e) {
    return false
  }
  return true
}

module.exports = isVariableValid
