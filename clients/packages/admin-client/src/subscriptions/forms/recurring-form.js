import PropTypes from 'prop-types'
import React from 'react'
import { reduxForm } from 'redux-form'
import { FormGroup, ControlLabel, FormControl } from 'components/forms'
import { Pagarme } from 'components/external-services'
import * as validationHelper from 'utils/validation-helper'
import * as validators from 'utils/redux-form/validators'
import * as normalizers from 'utils/redux-form/normalizers'

const RecurringForm = ({
  FormComponent,
  fields: {
    id,
    token,
    process_at: processAt
  },
  ...formProps
}) => (
  <div>
    <Pagarme />
    <FormComponent
      {...formProps}
      buttonText='Salvar'
    >
      <input type='hidden' name='id' value={id.value} />
      <input type='hidden' name='token' value={token.value} />
      <p className='mb3 lightgray'>
        Preencha os campos abaixo para alterar a data em que a cobrança da sua doação é efetuada.
        Sua doação continuará a mesma mas, a partir do momento em que salvar os dados abaixo,
        o valor será cobrado neste novo cartão ; )
      </p>

      <FormGroup className='mb2' controlId='processAt' {...processAt}>
        <ControlLabel>Nova data de cobrança</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: DD/MM/AAAA'
        />
      </FormGroup>
    </FormComponent>
  </div>
)

const fields = ['id', 'token', 'process_at']

const abstractValidate = values => {
  const errors = {}
  if (!values.process_at) {
    errors.process_at = 'Obrigatório'
  } else if (!validationHelper.date(values.process_at).ddmmyyyy) {
    errors.process_at = 'Formato de data inválido'
  }
  return errors
}

RecurringForm.propTypes = {
  FormComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired
}

export const normalizer = {
  process_at: normalizers.date.ddmmyyyy
}

export default ({ validate, mapStateToProps, mapDispatchToProps }) => reduxForm({
  form: 'recurringForm',
  fields,
  validate: validators.abstractValidate({ abstractValidate, validate })
}, mapStateToProps, mapDispatchToProps)(RecurringForm)
