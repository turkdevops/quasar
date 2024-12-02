const ignoreList = [
  'dist/*',
  'src-capacitor/*',
  'src-cordova/*',
  '.quasar/*',
  'quasar.config.*.temporary.compiled*'
]

export default {
  configs: {
    // using Array so we can add more stuff later if needed
    // without breaking changes
    recommended: [{
      ignores: ignoreList
    }]
  }
}
