import * as t from '../action-types'

export const initialState = {
  currentId: undefined,
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  error: undefined
}

const getWidget = (widget) => {
  if(widget.settings && widget.settings.fields) {
    return {
      ...widget,
      settings: {
        ...widget.settings,
        fields: JSON.parse(widget.settings.fields)
      }
    }
  }
  return widget
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECT_WIDGET:
      return { ...state, currentId: action.payload }

    case t.FETCH_WIDGETS_REQUEST:
    case t.FILTER_WIDGETS_REQUEST:
      return {...state,
        fetching: true
      }
    case t.FETCH_WIDGETS_SUCCESS:
    case t.FILTER_WIDGETS_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload.map(getWidget)
      }
    case t.FETCH_WIDGETS_FAILURE:
    case t.FILTER_WIDGETS_FAILURE:
      return {...state,
        isLoaded: true,
        fetching: false,
        error: action.payload
      }
    case t.UPDATE_WIDGET_REQUEST:
    case t.WIDGET_FORM_ENTRY_CREATE_REQUEST:
      return {...state,
        saving: true
      }
    case t.UPDATE_WIDGET_SUCCESS:
    case t.WIDGET_FORM_ENTRY_CREATE_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.map(
          w => w.id === action.payload.id ? getWidget(action.payload) : w
        )
      }
    case t.UPDATE_WIDGET_FAILURE:
    case t.WIDGET_FORM_ENTRY_CREATE_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    case t.ADD_WIDGETS_SUCCESS:
      return {...state,
        data: [...state.data, ...getWidget(action.payload)]
      }
    case t.SET_WIDGET_LIST:
      return { ...state, data: action.payload }
    case t.SELECT_MOBILIZATION:
      return initialState
    default:
      return state
  }
}
