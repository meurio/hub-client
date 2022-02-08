import * as t from '../action-types'

export interface Content {
  editorLinkTargetType: string;  
}

export interface Donation {
  saving: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customerData?: any;
}

export interface Pressure {
  saving: boolean;
  //
  // Store the `id` of the pressure widgets that have filled up by user
  // and needs to render the finish message.
  // @type Array -> Integer
  //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filledPressureWidgets: any[];
  filled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export interface StatePlugins {
  content: Content;
  donation: Donation;
  pressure: Pressure;
}

export const initialState = {
  content: {
    editorLinkTargetType: '_self'
  },
  donation: {
    saving: false,
    error: undefined,
    customerData: undefined
  },
  pressure: {
    saving: false,
    //
    // Store the `id` of the pressure widgets that have filled up by user
    // and needs to render the finish message.
    // @type Array -> Integer
    //
    filledPressureWidgets: [],
    filled: false,
    error: undefined
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state = initialState, action: any = {}): StatePlugins => {
  switch (action.type) {
    case t.SET_EDITOR_LINK_TARGET_TYPE:
      return {
        ...state,
        content: { editorLinkTargetType: action.payload }
      }
    case t.ASYNC_DONATION_TRANSACTION_CREATE_REQUEST:
      return {
        ...state,
        donation: { ...state.donation, saving: true }
      }
    case t.ASYNC_DONATION_TRANSACTION_CREATE_SUCCESS:
      return {
        ...state,
        donation: { ...state.donation, saving: false }
      }
    case t.ASYNC_DONATION_TRANSACTION_CREATE_FAILURE:
      return {
        ...state,
        donation: { ...state.donation, saving: false, error: action.payload }
      }
    case t.SET_DONATION_CUSTOMER_DATA:
      return {
        ...state,
        donation: { ...state.donation, customerData: action.payload }
      }
    case t.WIDGET_PRESSURE_FILL_REQUEST:
      return {
        ...state,
        pressure: { ...state.pressure, saving: true }
      }
    case t.WIDGET_PRESSURE_FILL_SUCCESS:
      return {
        ...state,
        pressure: {
          ...state.pressure, 
          saving: false,
          filledPressureWidgets: [
            ...state.pressure.filledPressureWidgets,
            action.payload
          ]
        }
      }
    case t.WIDGET_PRESSURE_FILL_FAILURE:
      return {
        ...state,
        pressure: {
          ...state.pressure,
          saving: false,
          error: action.payload
        }
      }
    default:
      return state;
  }
}
