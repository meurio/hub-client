import { createAction } from './create-action'
import * as t from '../action-types'

export default mode => dispatch => {
  dispatch(createAction(t.TURN_ON_EDITION, mode))
}
