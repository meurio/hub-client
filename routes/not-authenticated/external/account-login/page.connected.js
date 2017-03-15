import { reduxForm } from 'redux-form'

import * as AccountActions from '~account/action-creators'
import AccountSelectors from '~account/selectors'
import { isValidEmail } from '~client/utils/validation-helper'

import FormLogin from './page'

const fields = ['email', 'password']

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Informe seu email'
    errors.valid = false
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Email inválido'
    errors.valid = false
  }
  if (!values.password) {
    errors.password = 'Informe sua senha'
    errors.valid = false
  }
  return errors
}

const mapStateToProps = state => {
  return {
    user: AccountSelectors(state).getUser()
  }
}

export default reduxForm({
  form: 'loginForm',
  fields,
  validate
}, mapStateToProps, AccountActions)(FormLogin)
