import {
  SELECTABLE_LIST_SET_SELECTED_INDEX
} from './actions'

export const initialState = {}

//
// @todo: Make this reducer reusable, accepting a parameter with a prefix of
//        action to differs each other. For now, it will be used only inside
//        mobilization's templates reducers.
//
const SelectableListReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SELECTABLE_LIST_SET_SELECTED_INDEX:
      return { ...state, selectedIndex: action.index }
    default:
      return state
  }
}

export default SelectableListReducer
