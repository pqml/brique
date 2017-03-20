'use strict'
module.exports = function (data, utils) {
  return (

`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${data.moduleName}</title>
    <meta name="description" content="An example for ${data.moduleName}">
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,minimal-ui">
    <style>
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <script src="bundle.js"></script>
    <script>
    </script>
  </body>
</html>
`

  )
}
