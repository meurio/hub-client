import * as t from '../action-types'

export const initialState = {}

export default (state = initialState, action: any = {}) => {
  switch (action.type) {
    case t.LOADING_FILE:
      return {
        [action.payload.key]: action.payload.progress
      }
    case t.FINISH_LOADING_FILE:
      delete state[action.payload]
      return state
    default:
      return state
  }
}
