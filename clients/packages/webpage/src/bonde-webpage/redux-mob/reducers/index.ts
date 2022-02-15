import { combineReducers } from 'redux';

import blocksReducer from './Blocks';
import widgetsReducer from './Widgets';
import mobilizationsReducer from './Mobilizations';

export default combineReducers({
  list: mobilizationsReducer,
  blocks: blocksReducer,
  widgets: widgetsReducer,
});
