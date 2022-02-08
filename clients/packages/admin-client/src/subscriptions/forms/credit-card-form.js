import PropTypes from 'prop-types'
import React from 'react'
import { reduxForm } from 'redux-form'
import { FormGroup, ControlLabel, FormControl } from 'components/forms'
import { Pagarme } from 'components/external-services'
import * as validators from 'utils/redux-form/validators'
import * as normalizers from 'utils/redux-form/normalizers'

const CreditCardForm = ({
  FormComponent,
  fields: {
    id,
    token,
    creditcard,
    name,
    expiration,
    cvv
  },
  card,
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
        Altere os dados do seu cartão de crédito preenchendo os campos abaixo. Sua doação
        continuará a mesma mas, a partir do momento em que salvar os dados abaixo, o valor
        será cobrado neste novo cartão ; )
      </p>

      {card && (
        <div className='mb3 lightgray'>
          <b className='block mb1'>Dados do último cartão</b>
          <div>
            <span className='caps'>{card.brand}: </span>
            {card.first_digits.slice(0, 4)}{' '}
            {card.first_digits.slice(4, 6)}XX XXXX {card.last_digits}
          </div>
          <div>Nome: <span className='caps'>{card.holder_name}</span></div>
          <div>
            Validade: {card.expiration_date.slice(0, 2)}/{card.expiration_date.slice(2, 4)}
          </div>
        </div>
      )}

      <FormGroup className='mb2' controlId='creditcard' {...creditcard}>
        <ControlLabel>Número</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: 0000 0000 0000 0000'
        />
      </FormGroup>

      <FormGroup className='mb2' controlId='name' {...name}>
        <ControlLabel>Nome</ControlLabel>
        <FormControl
          type='text'
          placeholder='(igual ao que aparece no cartão)'
        />
      </FormGroup>

      <div className='clearfix col-12 mb3'>
        <FormGroup className='col col-6' controlId='expiration' {...expiration}>
          <ControlLabel>Validade</ControlLabel>
          <FormControl
            type='text'
            placeholder='00/00'
          />
        </FormGroup>

        <FormGroup className='col col-4 ml3' controlId='cvv' {...cvv}>
          <ControlLabel>CVV</ControlLabel>
          <FormControl
            type='text'
            placeholder='Ex: 000'
          />
        </FormGroup>
      </div>
    </FormComponent>
  </div>
)

const fields = ['id', 'token', 'creditcard', 'name', 'expiration', 'cvv']

const abstractValidate = values => {
  const errors = {}
  if (!values.creditcard) {
    errors.creditcard = 'Obrigatório'
  }
  if (!values.name) {
    errors.name = 'Obrigatório'
  }
  if (!values.expiration) {
    errors.expiration = 'Obrigatório'
  }
  if (!values.cvv) {
    errors.cvv = 'Obrigatório'
  }
  return errors
}

CreditCardForm.propTypes = {
  FormComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  card: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    first_digits: PropTypes.string.isRequired,
    last_digits: PropTypes.string.isRequired,
    holder_name: PropTypes.string.isRequired,
    expiration_date: PropTypes.string.isRequired
  })
}

export const normalizer = {
  creditcard: normalizers.creditcard,
  expiration: normalizers.date.mmyy,
  cvv: normalizers.number.max(4),
  name: normalizers.string.onlyWords
}

export default ({ validate, mapStateToProps, mapDispatchToProps }) => reduxForm({
  form: 'creditCardForm',
  fields,
  validate: validators.abstractValidate({ abstractValidate, validate })
}, mapStateToProps, mapDispatchToProps)(CreditCardForm)
