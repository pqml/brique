'use strict'
module.exports = function (data, utils) {
  return (

`{
  "name": ${data.pkgjson.name},
  "description": ${data.pkgjson.description},
  "version": ${data.pkgjson.version},
  "author": ${data.pkgjson.author},
  ${utils.indent(data.pkgjson.entries, 1, false)},
  "scripts": ${utils.indent(data.pkgjson.scripts, 1, false)},
  "directories": {
    "doc": "docs",
    "example": "examples",
    "test": "test"
  },
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {}
}
`

  )
}
