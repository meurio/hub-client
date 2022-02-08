import { createAction } from './create-action'
import * as t from '../action-types'

export default () => dispatch => {
  dispatch(createAction(t.TURN_OFF_EDITION))
}
