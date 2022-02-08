import * as t from '../action-types'

export default dispatch => (key, progress): void => {
  if (progress) dispatch({ type: t.LOADING_FILE, payload: { key, progress } })
  else dispatch({ type: t.FINISH_LOADING_FILE, payload: key })
}
