import * as t from '../action-types'

export default dispatch => (key): void => dispatch({ type: t.MOUSE_OUT, payload: { key } })
