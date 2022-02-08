import { createAction } from 'utils/redux'
import * as t from 'subscriptions/redux/action-types'

export default form => createAction(t.APPEND_ANIMATION_STACK, form)
