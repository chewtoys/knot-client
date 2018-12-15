import Vue from 'vue'
import bugsnag from '@bugsnag/js'
import bugsnagVue from '@bugsnag/plugin-vue'

if (!process.env.dev) {
  const bugsnagClient = bugsnag({
    apiKey: process.env['BUGSNAG_KEY']
  })
  bugsnagClient.use(bugsnagVue(Vue))
}
