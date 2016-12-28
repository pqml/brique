const errors = {
  noName: '💀  Error: You must provide a name to create a module',

  tooLong: '💀  Error:  Module name can\'t contain more than 214 characters',

  badStartChar: ' 💀  Error: Module name can only start with a lowercase ' +
  'alphabetic character',

  badChar: '💀  Error: Module name should contain only lowercase ' +
  'alphanumeric characters, dots, hyphens, and underscores',

  badTrimming: '💀  Error: Module name cannot contain leading or ' +
  'trailing spaces'
}

function validateName (name) {
  return new Promise((resolve, reject) => {
    if (name === undefined || typeof name !== 'string' || name.length === 0) {
      return reject(errors.noName)
    }

    if (name.length > 214) return reject(errors.tooLong)
    if (name.trim() !== name) return reject(errors.badTrimming)
    if (!name.match(/^[a-z]/)) return reject(errors.badStartChar)
    if (!name.match(/^[a-z0-9_\-\.]*$/)) return reject(errors.badChar)

    resolve()
  })
}

module.exports = validateName
