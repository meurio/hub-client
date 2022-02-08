import * as t from '../action-types'

export const initialState = {
  loading: false,
  isLoaded: false,
  data: [],
  currentId: undefined,
  error: undefined,
  forcedSubmit: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.FETCH:
      return {
        ...state,
        loading: true
      }
    case t.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoaded: true,
        data: action.data
      }
    case t.FETCH_FAIL:
      return {
        ...state,
        loading: false,
        isLoaded: false,
        error: action.error
      }
    case t.ADD:
      return {
        ...state,
        data: [...state.data, action.community]
      }
    case t.SET_ERRORS:
      return {
        ...state,
        submitError: {...action.submitError }
      }
    case t.CLEAR_ERROR:
      return {
        ...state,
        submitError: undefined
      }
    case t.EDIT:
      return {
        ...state,
        data: state.data.map(
          c => c.id === action.community.id ? action.community : c
        )
      }
    case t.SELECT:
      return { ...state, currentId: action.id }
    case t.UNSET:
      return {
        ...state,
        currentId: null
      }
    case t.REHYDRATE:
      return {
        ...initialState,
        isLoaded: true,
        data: [action.payload],
        currentId: action.payload.id
      }
    case t.ASYNC_INVITE_REQUEST:
      return { ...state }
    case t.ASYNC_INVITE_SUCCESS:
      return { ...state }
    case t.ASYNC_INVITE_FAILURE:
      return { ...state, error: action.payload }

    case t.SET_FORCED_SUBMIT:
      return { ...state, forcedSubmit: action.payload }

    default:
      return state
  }
}
