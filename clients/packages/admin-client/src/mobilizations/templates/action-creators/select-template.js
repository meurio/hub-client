import * as t from '../action-types'

const SelectTemplate = mobilizationId => dispatch => dispatch({
  type: t.SELECT_TEMPLATE,
  payload: mobilizationId
})

export default SelectTemplate
