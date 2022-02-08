import { fromJS } from 'immutable'

export const getIn = (obj, path) =>
  fromJS(obj).getIn(path.split('.'))

export const setIn = (obj, path, value) =>
  fromJS(obj).setIn(path.split('.'), value).toJS()

export const applyValidate = ({
  validate,
  message
}) => (fieldsOrField, customMessage) => (values, errorsCtx) => {
  let fields = fieldsOrField
  let errors = errorsCtx || {}
  if (typeof fieldsOrField === 'string') {
    fields = [fieldsOrField]
  }

  fields.map(fieldName => {
    const invalid = validate(getIn(values, fieldName))
    const error = getIn(errors, fieldName)
    if ((
      typeof invalid === 'object' || typeof invalid === 'string'
    ) && !error) {
      errors = setIn(errors, fieldName, invalid)
    } else if (typeof invalid === 'boolean' && invalid && !error) {
      errors = setIn(errors, fieldName, customMessage || message)
    }
    return error
  })
  return errors
}
