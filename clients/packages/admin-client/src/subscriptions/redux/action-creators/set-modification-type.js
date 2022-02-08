import { createAction } from 'utils/redux'
import * as t from 'subscriptions/redux/action-types'

export default modificationType => createAction(t.SET_MODIFICATION_TYPE, modificationType)
