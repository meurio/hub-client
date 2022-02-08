// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /community/twilio
//
export default store => ({
  path: 'twilio',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./page.connected').default)
    })
  }
})
