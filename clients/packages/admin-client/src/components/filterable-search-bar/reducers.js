import { FILTERABLE_SEARCH_BAR_SET_LIST } from './actions'

export const initialState = {
  list: []
}

//
// @todo: Make this reducer reusable, accepting a parameter with a prefix of
//        action to differs each other. For now, it will be used only inside
//        mobilization's templates reducers.
//
const FilterableSearchBarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FILTERABLE_SEARCH_BAR_SET_LIST:
      return { ...state, list: action.list }
    default:
      return state
  }
}

export default FilterableSearchBarReducer
