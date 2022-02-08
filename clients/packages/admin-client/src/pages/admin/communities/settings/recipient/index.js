// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /community/recipient
//
export default store => ({
  path: 'recipient',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./page.connected').default)
    })
  }
})
