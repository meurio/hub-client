import { combineReducers } from 'redux'
import * as actionCreators from './action-creators'

import FilterableSearchBarReducers from 'components/filterable-search-bar/reducers'
import SelectableListReducers from 'components/selectable-list/reducers'

import templatesReducer from './reducers'

export default {
  actionCreators,
  reducers: combineReducers(
    {
      list: templatesReducer,
      filterable: FilterableSearchBarReducers,
      selectable: SelectableListReducers
    }
  )
}
