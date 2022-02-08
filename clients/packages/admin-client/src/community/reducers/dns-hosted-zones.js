import * as t from '../action-types'

const initialState = {
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  error: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.FETCH_DNS_HOSTED_ZONES_REQUEST:
      return {...state,
        fetching: true
      }
    case t.FETCH_DNS_HOSTED_ZONES_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload
      }
    case t.FETCH_DNS_HOSTED_ZONES_FAILURE:
      return {...state,
        fetching: false,
        error: action.payload
      }
    case t.ADD_DNS_HOSTED_ZONE_REQUEST:
    case t.DELETE_DNS_HOSTED_ZONE_REQUEST:
    case t.CHECK_DNS_HOSTED_ZONE_REQUEST:
      return {...state,
        saving: true
      }
    case t.ADD_DNS_HOSTED_ZONE_SUCCESS:
      return {...state,
        saving: false,
        data: [action.payload, ...state.data]
      }
    case t.CHECK_DNS_HOSTED_ZONE_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.map(d => d.id === action.payload.id ? action.payload : d)
      }
    case t.DELETE_DNS_HOSTED_ZONE_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.filter(d => d.id !== action.payload.id)
      }
    case t.ADD_DNS_HOSTED_ZONE_FAILURE:
    case t.DELETE_DNS_HOSTED_ZONE_FAILURE:
    case t.CHECK_DNS_HOSTED_ZONE_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    case t.SELECT:
      // Force reload community when select new community
      return {...state,
        isLoaded: false
      }
    default:
      return state
  }
}
