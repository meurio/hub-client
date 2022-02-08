import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'

import {
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
  RadioGroup,
  Radio
} from 'components/forms'
import { SettingsForm } from 'ux/components'
import { HorizontalLayout } from 'components/grids'

const DonationSettingsPage = props => {
  const {
    dispatch,
    fields: {
      default_donation_value: defaultDonationValue,
      donation_value1: donationValue1,
      donation_value2: donationValue2,
      donation_value3: donationValue3,
      donation_value4: donationValue4,
      donation_value5: donationValue5,
      recurring_period: recurringPeriod,
      payment_methods: paymentMethods,
      payment_type: paymentType,
      goal_date_limit: goalDateLimit,
      goal,
      external_resource: externalResource
    },
    intl,
    ...formProps
  } = props
  const donationValueTitle = (
    <FormattedMessage
      id='page--donation-widget.form.donation-value-title'
      defaultMessage='Clique para definir este valor como padrão.'
    />
  )

  return (
    <SettingsForm
      {...formProps}
      buttonText={
        <FormattedMessage
          id='page--donation-widget.form.submit-button'
          defaultMessage='Salvar'
        />
      }
      onSubmit={values => {
        const { widget, asyncWidgetUpdate } = props
        const settings = widget.settings || {}

        return asyncWidgetUpdate({
          ...widget,
          settings: { ...settings, ...values },
          goal: values.goal && String(values.goal).replace(/,/g, '.')
        })
      }}
      successMessage={
        <FormattedMessage
          id='page--donation-widget.form.success-message'
          defaultMessage='Formulário de doação configurado com sucesso!'
        />
      }
    >
      <FormGroup controlId='payment-type-id' {...paymentType}>
        <ControlLabel>
          <FormattedMessage
            id='page--donation-widget.form.payment-type.label'
            defaultMessage='Tipo de doação'
          />
        </ControlLabel>
        <RadioGroup>
          <Radio value='unique'>
            <FormattedMessage
              id='page--donation-widget.form.payment-type.unique'
              defaultMessage='Única'
            />
          </Radio>
          <Radio value='recurring'>
            <FormattedMessage
              id='page--donation-widget.form.payment-type.recurring'
              defaultMessage='Recorrente'
            />
          </Radio>
          <Radio value='users_choice'>
            <FormattedMessage
              id='page--donation-widget.form.payment-type.users-choice'
              defaultMessage='Usuário escolhe'
            />
          </Radio>
        </RadioGroup>
      </FormGroup>

      {!(paymentType.value === 'recurring' || paymentType.value === 'users_choice') ? '' : (
        <FormGroup controlId='payment-type-id' {...recurringPeriod}>
          <ControlLabel>
            <FormattedMessage
              id='page--donation-widget.form.payment-interval.label'
              defaultMessage='Intervalo da recorrência'
            />
          </ControlLabel>
          <RadioGroup>
            <Radio value='30'>
              <FormattedMessage
                id='page--donation-widget.form.payment-interval.monthly'
                defaultMessage='Mensal'
              />
            </Radio>
            <Radio value='180'>
              <FormattedMessage
                id='page--donation-widget.form.payment-interval.semiannually'
                defaultMessage='Semestral'
              />
            </Radio>
            <Radio value='365'>
              <FormattedMessage
                id='page--donation-widget.form.payment-interval.annually'
                defaultMessage='Anual'
              />
            </Radio>
          </RadioGroup>
        </FormGroup>
      )}

      <div className='clearfix mxn1'>
        <FormGroup
          className='col col-12 lg-col-6'
          controlId='goal-value'
          style={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}
          {...goal}
        >
          <ControlLabel>
            <FormattedMessage
              id='page--donation-widget.form.goal.label'
              defaultMessage='Meta da campanha'
            />
          </ControlLabel>
          <FormControl
            type='text'
            placeholder={intl.formatMessage({
              id: 'page--donation-widget.form.goal.placeholder',
              defaultMessage: 'Ex.: 50000'
            })}
          />
        </FormGroup>

        <FormGroup
          className='col col-12 lg-col-6'
          controlId='goal-date-limit-value'
          style={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}
          {...goalDateLimit}
        >
          <ControlLabel>
            <FormattedMessage
              id='page--donation-widget.goal-date-limit.label'
              defaultMessage='Prazo de arrecadação'
            />
          </ControlLabel>
          <FormControl
            type='text'
            placeholder={intl.formatMessage({
              id: 'page--donation-widget.goal-date-limit.placeholder',
              defaultMessage: 'Ex.: DD/MM/AAAA'
            })}
          />
        </FormGroup>
      </div>
      <FormGroup controlId='external-resource' {...externalResource}>
        <ControlLabel>
          <FormattedMessage
            id='page--donation-widget.form.external-resource.label'
            defaultMessage='Recurso externo'
          />
        </ControlLabel>
        <HelpBlock>
          <FormattedMessage
            id='page--donation-widget.form.external-resource.helper-text'
            defaultMessage={
              'Caso você esteja arrecadando para esta campanha por outro canal, pode adicionar o ' +
              'valor arrecadado por fora aqui. Assim, vamos contabilizá-lo na barra de progresso'
            }
          />
        </HelpBlock>
        <FormControl type='number' />
      </FormGroup>
      <FormGroup controlId='default-donation-value' {...defaultDonationValue}>
        <ControlLabel>
          <FormattedMessage
            id='page--donation-widget.form.donation-default-value.label'
            defaultMessage='Valores das doações'
          />
        </ControlLabel>
        <HelpBlock>
          <FormattedMessage
            id='page--donation-widget.form.donation-default-value.helper-text'
            defaultMessage={
              'Você pode ter até 5 valores por bloco de doação. Preencha apenas com ' +
              'números inteiros (Ex: 50)'
            }
          />
        </HelpBlock>
        <HorizontalLayout cols={5}>
          <FormGroup controlId='donation-value1-id' {...donationValue1}>
            <ControlLabel>
              <FormattedMessage
                id='page--donation-widget.form.default-value-01.label'
                defaultMessage='Valor 1'
              />
            </ControlLabel>
            <FormControl
              placeholder={intl.formatMessage({
                id: 'page--donation-widget.form.default-value-01.placeholder',
                defaultMessage: 'R$20'
              })}
            />
          </FormGroup>
          <FormGroup controlId='donation-value2-id' {...donationValue2}>
            <ControlLabel>
              <FormattedMessage
                id='page--donation-widget.form.default-value-02.label'
                defaultMessage='Valor 2'
              />
            </ControlLabel>
            <FormControl
              placeholder={intl.formatMessage({
                id: 'page--donation-widget.form.default-value-02.placeholder',
                defaultMessage: 'R$50'
              })}
            />
          </FormGroup>
          <FormGroup controlId='donation-value3-id' {...donationValue3}>
            <ControlLabel>
              <FormattedMessage
                id='page--donation-widget.form.default-value-03.label'
                defaultMessage='Valor 3'
              />
            </ControlLabel>
            <FormControl
              placeholder={intl.formatMessage({
                id: 'page--donation-widget.form.default-value-03.placeholder',
                defaultMessage: 'R$100'
              })}
            />
          </FormGroup>
          <FormGroup controlId='donation-value4-id' {...donationValue4}>
            <ControlLabel>
              <FormattedMessage
                id='page--donation-widget.form.default-value-04.label'
                defaultMessage='Valor 4'
              />
            </ControlLabel>
            <FormControl
              placeholder={intl.formatMessage({
                id: 'page--donation-widget.form.default-value-04.placeholder',
                defaultMessage: 'R$200'
              })}
            />
          </FormGroup>
          <FormGroup controlId='donation-value5-id' {...donationValue5}>
            <ControlLabel>
              <FormattedMessage
                id='page--donation-widget.form.default-value-05.label'
                defaultMessage='Valor 5'
              />
            </ControlLabel>
            <FormControl
              placeholder={intl.formatMessage({
                id: 'page--donation-widget.form.default-value-05.placeholder',
                defaultMessage: 'R$500'
              })}
            />
          </FormGroup>
        </HorizontalLayout>
        <RadioGroup className='flex flex-wrap'>
          <Radio className='col col-2' title={donationValueTitle} value='1'>
            <FormattedMessage
              id='page--donation-widget.form.default-value.radio.text'
              defaultMessage='Default'
            />
          </Radio>
          <Radio className='col col-2' title={donationValueTitle} value='2'>
            <FormattedMessage
              id='page--donation-widget.form.default-value.radio.text'
              defaultMessage='Default'
            />
          </Radio>
          <Radio className='col col-2' title={donationValueTitle} value='3'>
            <FormattedMessage
              id='page--donation-widget.form.default-value.radio.text'
              defaultMessage='Default'
            />
          </Radio>
          <Radio className='col col-2' title={donationValueTitle} value='4'>
            <FormattedMessage
              id='page--donation-widget.form.default-value.radio.text'
              defaultMessage='Default'
            />
          </Radio>
          <Radio className='col col-2' title={donationValueTitle} value='5'>
            <FormattedMessage
              id='page--donation-widget.form.default-value.radio.text'
              defaultMessage='Default'
            />
          </Radio>
        </RadioGroup>
        <HelpBlock>
          <FormattedMessage
            id='page--donation-widget.form.default-value.helper-text'
            defaultMessage='*todos os valores são em reais'
          />
        </HelpBlock>
      </FormGroup>
      <FormGroup controlId='payment-methods-id' {...paymentMethods}>
        <ControlLabel>
          <FormattedMessage
            id='page--donation-widget.form.payment-method.label'
            defaultMessage='Habilitar pagamento por boleto?'
          />
        </ControlLabel>
        <HelpBlock>
          <FormattedMessage
            id='page--donation-widget.form.payment-method.helper-text'
            defaultMessage='O pagamento por boleto só está disponível para doações únicas. Cada boleto pago terá um custo adicional de R$3,00.'
          />
        </HelpBlock>
        <RadioGroup>
          <Radio value='true'>
            <FormattedMessage
              id='page--donation-widget.form.payment-method.radio.yes'
              defaultMessage='Sim'
            />
          </Radio>
          <Radio value='false'>
            <FormattedMessage
              id='page--donation-widget.form.payment-method.radio.no'
              defaultMessage='Não'
            />
          </Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <ControlLabel>
          <FormattedMessage
            id='page--donation-widget.form.bank-account.label'
            defaultMessage='Conta bancária'
          />
        </ControlLabel>
        <HelpBlock>
          <FormattedMessage
            id='page--donation-widget.form.bank-account.helper-text'
            defaultMessage={
              'Esta campanha está associada à conta bancária cadastrada ' +
              'nas configurações dessa comunidade ;)'
            }
          />
        </HelpBlock>
      </FormGroup>
    </SettingsForm>
  )
}

DonationSettingsPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired,
  // Injected by react-intl
  intl: intlShape.isRequired
}

export default injectIntl(DonationSettingsPage)
