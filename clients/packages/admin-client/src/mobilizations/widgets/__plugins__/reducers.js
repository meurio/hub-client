import { combineReducers } from 'redux'

import pressure from './pressure/reducers'
import donation from './donation/reducers'
import content from './content/reducers'

export default combineReducers({
  pressure,
  donation,
  content
})
