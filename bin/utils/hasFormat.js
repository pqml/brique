const UMD_FORMATS = [ 'cjs', 'amd', 'iife' ]

function hasFormat (format, formats) {
  if (~formats.indexOf(format)) return true
  if (~UMD_FORMATS.indexOf(format) && ~formats.indexOf('umd')) return true
  return false
}

module.exports = hasFormat
