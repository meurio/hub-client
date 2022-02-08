// polyfill webpack require.ensure
// eslint-disable-next-line no-restricted-properties
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /community/info
//
export default store => ({
  path: 'info',
  getComponent (nextState, callback) {
    // eslint-disable-next-line no-restricted-properties
    require.ensure([], function (require) {
      callback(null, require('./page.connected').default)
    })
  }
})