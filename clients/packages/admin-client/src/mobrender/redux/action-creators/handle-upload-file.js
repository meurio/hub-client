import { createAction } from './create-action'
import * as t from '../action-types'

export default (key, progress) => dispatch => {
  if (progress) dispatch(createAction(t.LOADING_FILE, { key, progress }))
  else dispatch(createAction(t.FINISH_LOADING_FILE, key))
}
