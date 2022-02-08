import * as t from '../action-types'

export interface StateEdition {
  isEditing: boolean;
  mode?: string;
}

export const initialState = {
  isEditing: false,
  mode: undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state: StateEdition = initialState, action: any = {}): StateEdition => {
  switch (action.type) {
    case t.TURN_ON_EDITION:
      return {...state,
        isEditing: true,
        mode: action.payload
      }
    case t.TURN_OFF_EDITION:
      return {...state,
        isEditing: false,
        mode: undefined
      }
    default:
      return state
  }
}
