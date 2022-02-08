import * as t from '../action-types'

export default dispatch => (block): void => {
  dispatch({ type: t.CHANGE_BLOCK_BACKGROUND, payload: block })
}
