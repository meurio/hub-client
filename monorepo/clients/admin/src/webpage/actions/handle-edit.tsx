import * as t from '../action-types'

export default dispatch => (mode): void => {
  dispatch({ type: t.TURN_ON_EDITION, payload: mode })
}
