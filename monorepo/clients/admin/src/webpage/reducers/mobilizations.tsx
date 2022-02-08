import * as t from '../action-types'

export type Status = 'active' | 'archived';

export interface Mobilization {
  id: number;
  name: string;
  slug: string;
  status: Status;
  traefik_backend_address?: string;
  traefik_host_rule?: string;
  twitter_share_text?: string;
  updated_at: string;
  user_id: number;
  language: string;
  header_font?: string;
  google_analytics_code?: string;
  goal?: string;
  favicon?: string;
  facebook_share_title?: string;
  facebook_share_image?: string;
  facebook_share_description?: string;
  deleted_at?: string;
  custom_domain?: string;
  created_at: string;
  community_id: number;
  color_scheme?: string;
  body_font?: string;
}

export interface StateMobilizations {
  isLoaded: boolean;
  fetching: boolean;
  saving: boolean;
  data: Mobilization[];
  currentId?: number;
  menuActiveIndex?: number;
  error?: any;
  reload?: boolean;
  communityId?: number;
}

export const initialState = {
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  currentId: undefined,
  menuActiveIndex: undefined,
  error: undefined,
  reload: undefined,
  communityId: undefined
}

export default (state: StateMobilizations = initialState, action: any = {}): StateMobilizations => {
  switch (action.type) {
    case t.ADD_MOBILIZATION_REQUEST:
    case t.UPDATE_MOBILIZATION_REQUEST:
      return {...state,
        saving: true
      }
    case t.ADD_MOBILIZATION_SUCCESS:
      return {...state,
        saving: false,
        data: [action.payload, ...state.data],
        currentId: action.payload.id
      }
    case t.UPDATE_MOBILIZATION_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.map(m => m.id === action.payload.id ? action.payload : m)
      }
    case t.ADD_MOBILIZATION_FAILURE:
    case t.UPDATE_MOBILIZATION_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    case t.FETCH_MOBILIZATIONS_REQUEST:
    case t.FILTER_MOBILIZATIONS_REQUEST:
      return {...state,
        fetching: true
      }
    case t.FETCH_MOBILIZATIONS_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload
      }
    case t.FILTER_MOBILIZATIONS_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        currentId: action.payload.length === 1 ? action.payload[0].id : undefined
      }
    case t.FETCH_MOBILIZATIONS_FAILURE:
    case t.FILTER_MOBILIZATIONS_FAILURE:
      return {...state,
        isLoaded: true,
        fetching: false,
        error: action.payload
      }
    case t.SELECT_MOBILIZATION:
      return {...state,
        currentId: action.payload,
        reload: action.payload !== state.currentId ? true : state.reload
      }
    case t.FETCH_BLOCKS_SUCCESS:
    case t.FETCH_WIDGETS_SUCCESS:
      return {...state,
        reload: false
      }
    case t.TOGGLE_MOBILIZATION_MENU:
      return {...state,
        menuActiveIndex: action.payload === state.menuActiveIndex ? undefined : action.payload
      }
    case t.SELECT_COMMUNITY:
      if (state.communityId !== action.id) {
        return {...state,
          isLoaded: false,
          communityId: action.id
        }
      }
      return state
    default:
      return state
  }
}
