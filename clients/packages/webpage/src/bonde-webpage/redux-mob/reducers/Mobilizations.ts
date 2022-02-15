import * as t from '../ActionTypes';

export const initialState = {
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  currentId: undefined,
  menuActiveIndex: undefined,
  error: undefined,
  communityId: undefined,
  reload: false,
};

type State = {
  isLoaded: boolean;
  fetching: boolean;
  saving: boolean;
  data: Array<any>;
  currentId?: number | string;
  menuActiveIndex?: any;
  error?: any;
  communityId?: number | string;
  reload: boolean;
};

export default (
  state: State = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case t.ADD_MOBILIZATION_REQUEST:
    case t.UPDATE_MOBILIZATION_REQUEST:
      return { ...state, saving: true };
    case t.ADD_MOBILIZATION_SUCCESS:
      return {
        ...state,
        saving: false,
        data: [action.payload, ...state.data],
        currentId: action.payload.id,
      };
    case t.UPDATE_MOBILIZATION_SUCCESS:
      return {
        ...state,
        saving: false,
        data: state.data.map((m: any) =>
          m.id === action.payload.id ? action.payload : m
        ),
      };
    case t.ADD_MOBILIZATION_FAILURE:
    case t.UPDATE_MOBILIZATION_FAILURE:
      return { ...state, saving: false, error: action.payload };
    case t.FETCH_MOBILIZATIONS_REQUEST:
    case t.FILTER_MOBILIZATIONS_REQUEST:
      return { ...state, fetching: true };
    case t.FETCH_MOBILIZATIONS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        fetching: false,
        data: action.payload,
      };
    case t.FILTER_MOBILIZATIONS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        fetching: false,
        data: action.payload,
        currentId:
          action.payload.length === 1 ? action.payload[0].id : undefined,
      };
    case t.FETCH_MOBILIZATIONS_FAILURE:
    case t.FILTER_MOBILIZATIONS_FAILURE:
      return {
        ...state,
        isLoaded: true,
        fetching: false,
        error: action.payload,
      };
    case t.SELECT_MOBILIZATION:
      return {
        ...state,
        currentId: action.payload,
        reload: action.payload !== state.currentId ? true : state.reload,
      };
    case t.FETCH_BLOCKS_SUCCESS:
    case t.FETCH_WIDGETS_SUCCESS:
      return { ...state, reload: false };
    case t.TOGGLE_MOBILIZATION_MENU:
      return {
        ...state,
        menuActiveIndex:
          action.payload === state.menuActiveIndex ? undefined : action.payload,
      };
    default:
      return state;
  }
};
