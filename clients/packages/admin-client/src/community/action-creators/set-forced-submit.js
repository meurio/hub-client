import { createAction } from 'utils/redux'
import * as t from 'community/action-types'

export default force => createAction(t.SET_FORCED_SUBMIT, force)
