import { injectAsyncReducer } from 'store'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /community/domain
//
export default store => ({
  path: 'domain',

  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'community', require('community/reducers').default)
      callback(null, require('./page.connected').default)
    })
  }
})
