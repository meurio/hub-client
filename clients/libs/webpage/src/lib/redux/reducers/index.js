import { combineReducers } from 'redux'

import blocksReducer from './blocks'
import widgetsReducer from './widgets'
import mobilizationsReducer from './mobilizations'

export default combineReducers({
  list: mobilizationsReducer,
  blocks: blocksReducer,
  widgets: widgetsReducer
})
