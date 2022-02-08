export const combineValidations = (validations) => (values) => {
  let errors = {}
  validations.map(fn => errors = fn(values, errors))
  return errors
}
