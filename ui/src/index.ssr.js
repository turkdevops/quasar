/**
 * SSR server prod entry-point
 */

import installQuasar from './install-quasar.js'
import lang from './plugins/private.lang/Lang.js'
import iconSet from './plugins/private.icon-set/IconSet.js'

import * as components from './components.js'
import * as directives from './directives.js'

export * from './components.js'
export * from './directives.js'
export * from './plugins.js'
export * from './composables.js'
export * from './utils.js'

export const Quasar = {
  version: __QUASAR_VERSION__,
  install (app, opts, ssrContext) {
    installQuasar(
      app,
      { components, directives, ...opts },
      ssrContext
    )
  },
  lang,
  iconSet
}
