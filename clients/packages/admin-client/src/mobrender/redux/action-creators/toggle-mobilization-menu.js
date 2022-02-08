import * as t from '../action-types'
import { createAction } from './create-action'

export default id => dispatch => {
  const payload = !isNaN(parseInt(id, 10)) ? parseInt(id, 10) : undefined
  dispatch(createAction(t.TOGGLE_MOBILIZATION_MENU, payload))
}
