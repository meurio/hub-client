// Current module dependencies
import * as t from 'mobilizations/templates/action-types'

export const initialState = {
  loading: false,
  loaded: false,
  global: [],
  custom: [],
  templateId: undefined
}

const MobilizationTemplatesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.REQUEST_TEMPLATE_CREATE:
      return { ...state, loading: true }
    case t.SUCCESS_TEMPLATE_CREATE:
      const templates = action.template.global
        ? { global: [...state.global, action.template] }
        : { custom: [...state.custom, action.template] }
      return { ...state, loading: false, loaded: true, ...templates }
    case t.FAILURE_TEMPLATE_CREATE:
      return { ...state, loading: false, error: action.error }

    case t.REQUEST_TEMPLATE_FETCH:
      return { ...state, loading: true }
    case t.SUCCESS_TEMPLATE_FETCH:
      if (action.templates) {
        state.global = action.templates.filter(template => template.global)
        state.custom = action.templates.filter(template => !template.global)
      }
      return { ...state, loading: false, loaded: true }
    case t.FAILURE_TEMPLATE_FETCH:
      return { ...state, loading: false, error: action.error }

    case t.REQUEST_TEMPLATE_DESTROY:
      return { ...state, loading: true }
    case t.SUCCESS_TEMPLATE_DESTROY:
      const index = state.custom.findIndex(template => template.id === action.template.id)
      return {
        ...state,
        loading: false,
        custom: [...state.custom.slice(0, index), ...state.custom.slice(index + 1)]
      }
    case t.FAILURE_TEMPLATE_DESTROY:
      return { ...state, loading: false, error: action.error }
    case t.SELECT_TEMPLATE:
      return {
        ...state,
        templateId: action.payload
      }
    default:
      return state
  }
}

export default MobilizationTemplatesReducer
