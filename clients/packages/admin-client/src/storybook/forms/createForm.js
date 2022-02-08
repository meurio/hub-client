import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { createFormProvider } from './createFormProvider'

export const subscribe = (intl, HOC) => settings => {
  /**
   * Subscribe a form component to use `react-redux` and
   * `redux-form`, removing the third-party library coupling
   * in forms.
   */

  const {
    name,
    fields,
    validate,
    submit,
    initialValues: mapValues,
    component: FormComponent
  } = settings

  // always use a provider form, it is responsible to control
  // the behavior of form.
  const FormProvider = createFormProvider(FormComponent || 'form')
  // redux-form configuration
  const configForm = { form: name, fields, validate }
  // react-redux configuration
  const mapStateToProps = (state, props) => ({
    initialValues: (
      typeof mapValues === 'function' ? mapValues(state, props)
        : typeof mapValues === 'object' ? mapValues
        : null
    )
  })
  const mapActionsToProps = (dispatch, props) => ({
    submit: (values) => dispatch(submit(values, props))
  })
  // return a form component decorated
  return intl(HOC(
    configForm,
    mapStateToProps,
    mapActionsToProps
  )(FormProvider))
}

export const createForm = subscribe(injectIntl, reduxForm)
