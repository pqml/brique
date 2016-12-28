function newIndentedLine (n, line) {
  let str = '\n'
  for (let i = 0; i < n; i++) {
    str += '  '
  }
  str += line
  return str
}

module.exports = newIndentedLine
