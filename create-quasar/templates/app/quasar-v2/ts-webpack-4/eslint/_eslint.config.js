import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginQuasar from '@quasar/app-webpack/eslint'
import vueTsEslintConfig from '@vue/eslint-config-typescript'<% if (prettier) { %>
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting'<% } %>

export default [
  {
    /**
     * Ignore the following files.
     * Please note that pluginQuasar.configs.recommended already ignores
     * the "node_modules" folder for you (and all other Quasar project
     * relevant folders and files).
     *
     * ESLint requires "ignores" key to be the only one in this object
     */
    // ignores: []
  },

  pluginQuasar.configs.recommended,
  js.configs.recommended,
  ...pluginVue.configs[ 'flat/essential' ],
  ...vueTsEslintConfig(),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: 'readonly', // process.env.*
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly', // BEX related
        browser: 'readonly' // BEX related
      }
    },

    linterOptions: {
      reportUnusedDisableDirectives: 'warn'
    },

    // add your custom rules here
    rules: {
      'prefer-promise-reject-errors': 'off',

      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  },

  {
    files: [ 'src-pwa/custom-service-worker.{js,ts}' ],
    languageOptions: {
      globals: {
        ...globals.serviceworker
      }
    }
  }<% if (prettier) { %>,

  prettierSkipFormatting<% } %>
]
