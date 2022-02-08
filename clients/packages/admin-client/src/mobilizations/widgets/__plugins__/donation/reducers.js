import * as t from './action-types'

export const initialState = {
  saving: false,
  error: undefined,
  customerData: undefined
}
export const initialAction = { type: '' }

export default (state = initialState, action = initialAction) => {
  switch (action.type) {
    case t.ASYNC_DONATION_TRANSACTION_CREATE_REQUEST:
      return { ...state, saving: true }
    case t.ASYNC_DONATION_TRANSACTION_CREATE_SUCCESS:
      return { ...state, saving: false }
    case t.ASYNC_DONATION_TRANSACTION_CREATE_FAILURE:
      return { ...state, saving: false, error: action.payload }

    case t.SET_DONATION_CUSTOMER_DATA:
      return { ...state, customerData: action.payload }

    default:
      return state
  }
}
