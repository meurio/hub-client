import * as t from './action-types'

export const initialState = {
  loading: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SET_LOADING:
      return { ...state, loading: action.payload }

    default:
      return state
  }
}
