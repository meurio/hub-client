import * as t from './action-types'

const initialState = {
  currentLocale: null,
  defaultLocale: null,
  locales: [],
  messages: {}
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SET_CURRENT_LOCALE:
      return { ...state, currentLocale: action.payload }

    default:
      return state
  }
}

export default reducer
