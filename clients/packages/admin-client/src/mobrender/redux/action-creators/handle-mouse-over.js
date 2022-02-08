import { createAction } from './create-action'
import * as t from '../action-types'

export default (key, id) => dispatch => dispatch(createAction(t.MOUSE_OVER, { key, id }))
