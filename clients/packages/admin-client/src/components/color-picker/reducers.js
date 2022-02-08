import {
  SET_SELECTED_COLOR
} from './actions'

const initialState = {
  loading: false,
  loaded: false,
  color: undefined
}

const ColorPickerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_COLOR:
      return {
        ...state,
        color: action.color
      }
    default:
      return state
  }
}

export default ColorPickerReducer
