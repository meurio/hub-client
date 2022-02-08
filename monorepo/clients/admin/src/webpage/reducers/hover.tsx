import * as t from '../action-types'

export const initialState = {}

export default (state = initialState, action: any = {}) => {
  switch (action.type) {
    case t.MOUSE_OVER:
      return {
        ...state,
        [action.payload.key]: action.payload.id
      }
    case t.MOUSE_OUT:
      if (action.payload.key in state) {
        return {
          ...state,
          [action.payload.key]: undefined
        }
      } else {
        return state
      }
    default:
      return state
  }
}
