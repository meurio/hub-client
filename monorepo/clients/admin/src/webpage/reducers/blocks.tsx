import * as t from '../action-types'

export interface Block {
  id: number;
  position: number;
  mobilization_id: number;
  bg_class?: string;
  bg_image?: string;
  created_at: string;
  deleted_at?: string;
  hidden?: boolean | string;
  menu_hidden?: boolean | string;
  name?: string;
  updated_at: string;
}

export interface StateBlocks {
  isLoaded: boolean;
  fetching: boolean;
  saving: boolean;
  data: Block[];
  error?: any;
}

export const initialState = {
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  error: undefined
}

export default (state: StateBlocks = initialState, action: any = {}): StateBlocks => {
  switch (action.type) {
    case t.FETCH_BLOCKS_REQUEST:
    case t.FILTER_BLOCK_REQUEST:
      return {...state,
        fetching: true
      }
    case t.FETCH_BLOCKS_SUCCESS:
    case t.FILTER_BLOCKS_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload
      }
    case t.FETCH_BLOCKS_FAILURE:
    case t.FILTER_BLOCKS_FAILURE:
      return {...state,
        isLoaded: true,
        fetching: false,
        error: action.payload
      }
    case t.ADD_BLOCK_REQUEST:
    case t.UPDATE_BLOCK_REQUEST:
    case t.DESTROY_BLOCK_REQUEST:
      return {...state,
        saving: true
      }
    case t.ADD_BLOCK_SUCCESS:
      return {...state,
        saving: false,
        data: [...state.data, action.payload]
      }
    case t.UPDATE_BLOCK_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.map(
          b => b.id === action.payload.id ? action.payload : b
        )
      }
    case t.DESTROY_BLOCK_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.filter(b => b.id !== action.payload.id)
      }
    case t.CHANGE_BLOCK_BACKGROUND:
      return {...state,
        data: state.data.map(
          b => b.id === action.payload.id ? action.payload : b
        )
      }
    case t.ADD_BLOCK_FAILURE:
    case t.UPDATE_BLOCK_FAILURE:
    case t.DESTROY_BLOCK_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    case t.UPDATE_BLOCK_BATCH:
      return {...state,
        saving: false,
        data: state.data.map(b => {
          const block = action.payload.find(u => u.id === b.id)
          if (block) return block
          return b
        })
      }
    case t.SELECT_MOBILIZATION:
      return initialState
    default:
      return state
  }
}
