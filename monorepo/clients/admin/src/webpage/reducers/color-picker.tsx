import * as t from "../action-types";

export interface StateColorPicker {
  loading: boolean;
  loaded: boolean;
  color?: any
}

export const initialState = {
  loading: false,
  loaded: false,
  color: undefined
}

const ColorPickerReducer = (state = initialState, action: any = {}): StateColorPicker => {
  switch (action.type) {
    case t.SET_SELECTED_COLOR:
      return {
        ...state,
        color: action.payload
      }
    default:
      return state
  }
}

export default ColorPickerReducer
