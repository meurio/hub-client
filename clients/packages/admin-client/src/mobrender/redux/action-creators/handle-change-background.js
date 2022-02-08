import { createAction } from './create-action'
import * as t from '../action-types'

export default block => dispatch => {
  dispatch(createAction(t.CHANGE_BLOCK_BACKGROUND, block))
}
