import { createAction } from './create-action'
import * as t from '../action-types'

export default (key) => dispatch => dispatch(createAction(t.MOUSE_OUT, { key }))
