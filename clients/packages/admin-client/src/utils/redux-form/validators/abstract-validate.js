export default ({ abstractValidate, validate }) => values => {
  // Default validation
  let errors = abstractValidate(values)
  if (Object.keys(errors).length) return errors

  // Custom injected validation
  errors = validate ? validate(values) : {}
  return errors
}
