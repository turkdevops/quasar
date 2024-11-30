const ignoreList = [
  'dist/*',
  'src-capacitor/*',
  'src-cordova/*',
  '.quasar/*',
  'quasar.config.*.temporary.compiled*'
]

export default {
  configs: {
    recommended: {
      ignores: ignoreList
    }
  }
}
