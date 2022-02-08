//
// @route /community/new
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import * as CommunityActions from 'community/action-creators'

import Page from './page'

const mapStateToProps = state => {
  const { community: { list: { submitError } } } = state
  return {
    submitError
  }
}

const validate = (values, { intl }) => {
  let error = {}
  if (!values.name) {
    error.name = intl.formatMessage({
      id: 'page--community-new.form.name.validation.required',
      defaultMessage: 'Informe o nome da comunidade'
    })
  }
  if (!values.city) {
    error.city = intl.formatMessage({
      id: 'page--community-new.form.city.validation.required',
      defaultMessage: 'Informe em qual cidade sua comunidade atua'
    })
  }
  return error
}

const clearError = () => ({type: 'CLEAR_ERROR'})

export default connect(mapStateToProps, { clearError })(injectIntl(reduxForm({
  form: 'communityNewForm',
  fields: ['name', 'city'],
  validate
}, undefined, CommunityActions)(Page)))
