import { createAction } from 'utils/redux'
import * as t from 'subscriptions/redux/action-types'

export default index => createAction(t.REMOVE_ANIMATION_STACK, index)
