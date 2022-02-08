import * as t from '../action-types'

export default dispatch => (key, id): void => dispatch({ type: t.MOUSE_OVER, payload: { key, id } })
