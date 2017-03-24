'use strict'
module.exports = function (data, utils) {
  return (

`# ${data.moduleName}
### ${data.description}

### Installation
\`\`\`sh
npm install --save ${data.moduleName}
\`\`\`

### Usage
\`\`\`js
\`\`\`

### License
MIT.
`

  )
}
