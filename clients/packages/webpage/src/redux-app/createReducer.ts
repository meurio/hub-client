import { combineReducers } from 'redux';

// Thirdy apps
import { reducer as mobilizationReducer } from '../bonde-webpage';
import { reducer as intlReducer } from './intlReducer';

// Source Request reducer
const LOAD_SOURCE_REQUEST = 'sourceRequest/LOAD_SOURCE_REQUEST';
const sourceReqInitialState = {
  host: '',
  protocol: '',
};
export const sourceReqCreateReducer =
  (initialState: any) =>
  (state: any = initialState, action: any = {}) => {
    switch (action.type) {
      case LOAD_SOURCE_REQUEST:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

// createReducer
const createReducer = (initialState = {}) =>
  combineReducers({
    intl: intlReducer,
    sourceRequest: sourceReqCreateReducer(sourceReqInitialState),
    mobilizations: mobilizationReducer,
    ...initialState,
  });

export default createReducer;
