import * as t from '../action-types'

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type Kind = 'content' | 'donation' | 'draft' | 'form' | 'pressure-phone' | 'pressure';

export interface Widget {
  id: number;
  kind: Kind;
  created_at: string;
  deleted_at?: string;
  exported_at?: string;
  goal?: string;
  lg_size?: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mailchimp_recurring_active_segment_id?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mailchimp_recurring_inactive_segment_id?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mailchimp_segment_id?: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  mailchimp_unique_segment_id?: any;
  md_size?: number | string;
  sm_size?: number | string;
  updated_at: string;
  block_id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings?: any;
  form_entries_count?: number;
}

export interface StateWidgets {
  currentId?: number;
  isLoaded: boolean;
  fetching: boolean;
  saving: boolean;
  data: Widget[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const initialState = {
  currentId: undefined,
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  error: undefined
}

const getWidget = (widget: Widget): Widget => {
  if(widget.settings?.fields) {
    console.log("getWidget::fields ->", widget.settings.fields);
    return {
      ...widget,
      settings: {
        ...widget.settings,
        // Entender melhor se os campos fields vem como string
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        fields: JSON.parse(widget.settings.fields)
      }
    }
  }
  return widget
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state: StateWidgets = initialState, action: any = {}): StateWidgets => {
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
        data: action.payload.map((element: Widget) => getWidget(element))
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
          w => w.id === action.payload.id ? getWidget(action.payload as Widget) : w
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
        data: [...state.data, ...(action.payload as Widget[]).map((element) => getWidget(element))]
      }
    case t.SET_WIDGET_LIST:
      return { ...state, data: action.payload }
    case t.SELECT_MOBILIZATION:
      return initialState
    default:
      return state
  }
}
