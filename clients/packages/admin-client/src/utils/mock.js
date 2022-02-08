export const noop = () => {}

export const store = (state = {}) => ({
  getState: () => state,
  subscribe: noop,
  dispatch: noop
})
