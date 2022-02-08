import * as t from 'subscriptions/redux/action-types'

export const initialState = {
  //
  // Store the status of an async request that tells if it is on progress or not.
  // @type Boolean
  //
  isLoading: false,
  //
  // Store the modification type that the user wants to do in the subscription like,
  // change the credit card data or, the recurring date of charging.
  // @type String
  //
  modificationType: undefined,
  //
  // Store the stack of form components to be rendered with
  // transition animation using CSSTransitionGroup.
  // @type Array -> PropTypes.element
  //
  animationStack: [],
  //
  // Store the error message.
  // @type String
  //
  error: undefined,
  //
  // Store the subscription data.
  // @type Object
  //
  data: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SET_MODIFICATION_TYPE:
      return { ...state, modificationType: action.payload }

    case t.APPEND_ANIMATION_STACK:
      return {
        ...state,
        animationStack: [...state.animationStack, action.payload]
      }
    case t.REMOVE_ANIMATION_STACK:
      const index = action.payload
      return {
        ...state,
        animationStack: [
          ...state.animationStack.slice(0, index),
          ...state.animationStack.slice(index + 1)
        ]
      }

    case t.ASYNC_RECHARGE_REQUEST:
      return { ...state, isLoading: true }
    case t.ASYNC_RECHARGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        modificationType: undefined,
        animationStack: [],
        error: undefined
      }
    case t.ASYNC_RECHARGE_FAILURE:
      return { ...state, isLoading: false, error: action.payload }

    case t.ASYNC_FETCH_SUCCESS:
      return { ...state, data: action.payload }
    case t.ASYNC_FETCH_FAILURE:
      return { ...state, error: action.payload }

    default:
      return state
  }
}
