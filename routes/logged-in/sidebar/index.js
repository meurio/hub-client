// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~common/store'

export default store => ({
  path: '/',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./mobilizations-list/page.connected').default
      })
    })
  },
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'mobilizations', require('~client/mobilizations/reducers').default)
      callback(null, require('./container.connected').default)
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./blocks-create').default(store),
        require('./community-settings-info').default(store),
        require('./community-settings-mailchimp').default(store),
        require('./community-settings-recipient').default(store),
        require('./mobilizations-edit').default(store),
        require('./mobilizations-launch').default(store),
        require('./mobilizations-list').default(store),
        require('./mobilizations-new').default(store),
        require('./mobilizations-settings-analytics').default(store),
        require('./mobilizations-settings-basics').default(store),
        require('./mobilizations-settings-domain').default(store),
        require('./mobilizations-settings-sharing').default(store),
        require('./templates-choose').default(store),
        require('./templates-choose-custom').default(store),
        require('./templates-choose-global').default(store),
        require('./templates-create').default(store),
        require('./templates-list').default(store),
        require('./widgets-donation-settings').default(store),
        require('./widgets-donation-settings-autofire').default(store),
        require('./widgets-donation-settings-export').default(store),
        require('./widgets-donation-settings-finish').default(store),
        require('./widgets-form-settings').default(store),
        require('./widgets-form-settings-autofire').default(store),
        require('./widgets-form-settings-export').default(store),
        require('./widgets-form-settings-fields').default(store),
        require('./widgets-form-settings-finish').default(store),
        require('./widgets-pressure-settings').default(store),
        require('./widgets-pressure-settings-autofire').default(store),
        require('./widgets-pressure-settings-email').default(store),
        require('./widgets-pressure-settings-finish').default(store),

        require('~common/routes/not-found').default
      ])
    })
  }
})
