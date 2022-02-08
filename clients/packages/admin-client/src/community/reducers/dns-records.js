import * as t from '../action-types'

const initialState = {
  fetching: false,
  saving: false,
  data: [],
  error: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.FETCH_DNS_RECORDS_REQUEST:
      return {...state,
        fetching: true
      }
    case t.ADD_DNS_RECORD_REQUEST:
    case t.DELETE_DNS_RECORD_REQUEST:
      return {...state,
        saving: true
      }
    case t.FETCH_DNS_RECORDS_SUCCESS:
      return {...state,
        fetching: false,
        data: action.payload
      }
    case t.ADD_DNS_RECORD_SUCCESS:
      return {...state,
        saving: false,
        data: [...state.data, action.payload]
      }
    case t.DELETE_DNS_RECORD_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.filter(d => d.id !== action.payload.id)
      }
    case t.FETCH_DNS_RECORDS_FAILURE:
      return {...state,
        fetching: false,
        error: action.payload
      }
    case t.ADD_DNS_RECORD_FAILURE:
    case t.DELETE_DNS_RECORD_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    default:
      return state
  }
}
