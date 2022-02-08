//
// @route /community/domain/add
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { toast } from 'react-toastify'
import { isValidDomain } from 'utils/validation-helper'
import DnsControlSelectors from 'community/dns-control-selectors'
import * as dnsNotify from 'community/notifications/dns'
import {
  asyncAddHostedZone as addHostedZone,
  asyncCheckHostedZone
} from 'community/action-creators/dns-control'
import Page from './page'

const fields = ['domain_name']

const validate = (values, { intl }) => {
  const errors = {}
  if (!values.domain_name) {
    errors.domain_name = intl.formatMessage({
      id: 'page--community-domain-create.step-add.form.domain-name.validation.required',
      defaultMessage: 'Domínio é obrigatório.'
    })
  } else if (!isValidDomain(values.domain_name)) {
    errors.domain_name = intl.formatMessage({
      id: 'page--community-domain-create.step-add.form.domain-name.validation.invalid-domain-format',
      defaultMessage: 'Domínio inválido'
    })
  }
  return errors
}

const mapStateToProps = state => ({
  saving: DnsControlSelectors(state).dnsHostedZones().isSaving()
})

const mapActionsToProps = (dispatch, { intl }) => ({
  asyncAddHostedZone: (values) => {
    return dispatch(addHostedZone(values))
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        // dispatch(notify(dnsNotify.addHostedZoneFailure(intl)))
        toast.error(dnsNotify.addHostedZoneFailure(intl).message, { 
          autoClose: 5000,
          hideProgressBar: true,
        })
      })
  },
  asyncCheckHostedZone: (args) => dispatch(asyncCheckHostedZone(args)),
  notify: (args) => {
    console.log(args)
    toast.error(args, {
      autoClose: 5000,
      hideProgressBar: true,
    })
    //dispatch(notify(args))
  }
})

export default injectIntl(connect(mapStateToProps, mapActionsToProps)(
  reduxForm({ form: 'createDomainForm', fields, validate })(Page))
)
