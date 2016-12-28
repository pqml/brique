const sh = require('kool-shell')

function yesnoConfig (baseConfig, questions) {
  return new Promise((resolve, reject) => {
    let config = Object.assign({}, baseConfig)

    let i = 0
    function iterate () {
      const question = questions[i]
      const yesDef = question[2] !== undefined ? question[2] : true
      const questionStr = '→ ' + question[0] + (yesDef ? ' (yes) ' : ' (no) ')
      sh.question(
        questionStr,
        answer => !!((yesDef && answer === '') || answer.match(/^y(es)?$/i))
      )
        .then((answer) => {
          question[1](config)
          next()
        })
        .catch((answer) => {
          next()
        })
    }

    function next () {
      if (++i < questions.length) iterate()
      else resolve(config)
    }

    if (questions.length > 0) iterate()
    else resolve(config)
  })
}

module.exports = yesnoConfig
