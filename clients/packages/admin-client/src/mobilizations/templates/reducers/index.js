import { combineReducers } from 'redux'

import list from 'mobilizations/templates/reducers/list'
import filterable from 'components/filterable-search-bar/reducers'
import selectable from 'components/selectable-list/reducers'

export default combineReducers({
  list,
  filterable,
  selectable
})
