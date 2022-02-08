//
// @route /mobilizations/:mobilization_id/templates/create
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'

import MobSelectors from 'mobrender/redux/selectors'
import * as TemplateActions from 'mobilizations/templates/action-creators'

import Page from './page'

const mapStateToProps = state => {
  const mobilization = MobSelectors(state).getMobilization()
  return {
    mobilization,
    initialValues: {
      mobilization_id: mobilization.id,
      global: false
    }
  }
}

const mapActionCreatorsToProps = {
  submit: TemplateActions.asyncCreateTemplate
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
  injectIntl(
    reduxForm({
      form: 'templateCreateForm',
      validate: (values, { intl }) => {
        const errors = {}
        const requiredMessage = intl.formatMessage({
          id: 'page--templates-create.form.validation.required',
          defaultMessage: 'Preenchimento obrigatório'
        })

        if (!values.name) errors.name = requiredMessage
        if (!values.goal) errors.goal = requiredMessage
        return errors
      },
      fields: ['name', 'goal', 'mobilization_id', 'global']
    })(Page)
  )
)
