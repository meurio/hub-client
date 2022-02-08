// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /community/mailchimp
//
export default store => ({
  path: 'mailchimp',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./page.connected').default)
    })
  }
})
