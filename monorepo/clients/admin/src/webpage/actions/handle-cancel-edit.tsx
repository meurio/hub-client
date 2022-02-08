import * as t from '../action-types'

export default (dispatch) => (): void => {
  dispatch({ type: t.TURN_OFF_EDITION })
}
