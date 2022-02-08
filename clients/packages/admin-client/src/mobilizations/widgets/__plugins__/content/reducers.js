import * as t from './action-types'

export const initialState = {
  editorLinkTargetType: '_self'
}
export const initialAction = { type: '' }

export default (state = initialState, action = initialAction) => {
  switch (action.type) {
    case t.SET_EDITOR_LINK_TARGET_TYPE:
      return { ...state, editorLinkTargetType: action.payload }

    default:
      return state
  }
}
