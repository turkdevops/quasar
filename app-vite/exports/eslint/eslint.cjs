const ignoreList = [
  'dist/*',
  'src-capacitor/*',
  'src-cordova/*',
  '.quasar/*',
  'quasar.config.*.temporary.compiled*'
]

module.exports = {
  configs: {
    recommended: {
      ignores: ignoreList
    }
  }
}
