import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import classnames from 'classnames'
import { Loading } from 'components/await'
import { Background } from 'components/layout'
import { CreditCardForm, RecurringForm } from 'subscriptions/forms'
import { FlatForm } from 'ux/components'
import * as SubscriptionActions from 'subscriptions/redux/action-creators'
import './page.scss'

const CreditCardFormImplementation = CreditCardForm({
  mapDispatchToProps: {
    submit: values => {
      //
      // The `PagarMe` object is injected into the global scope by the <Pagarme /> component
      // located in `client/components/external-services/pagarme.js`. By default, the
      // `<CreditCardForm />` component renders that component, so, we can use it here.
      //
      // It needs to use some other approach instead of inject the .min file of the library
      // directly into the DOM. I tried to use the official CJS module package provided by the
      // Pagarme team https://github.com/pagarme/pagarme-js but, it's bundle size is too big.
      // It have an issue that may will enhance the bundle size a litte, see:
      // https://github.com/pagarme/pagarme-js/issues/35
      //
      const promise = new Promise((resolve, reject) => {
        // eslint-disable-next-line
        PagarMe.encryption_key = process.env.REACT_APP_PAGARME_KEY

        // eslint-disable-next-line
        const card = new PagarMe.creditCard()
        const expiration = values.expiration.match(/(\d{2})\/(\d{2})/)
        card.cardHolderName = values.name
        card.cardExpirationMonth = expiration[1]
        card.cardExpirationYear = expiration[2]
        card.cardNumber = values.creditcard
        card.cardCVV = values.cvv

        const errors = card.fieldErrors()

        /* eslint-disable prefer-promise-reject-errors */
        Object.keys(errors).length > 0
          ? reject({
            cvv: errors.card_cvv,
            expiration: errors.card_expiration_month,
            name: errors.card_holder_name,
            creditcard: errors.card_number
          })
          : card.generateHash(cardHash => {
            resolve(SubscriptionActions.asyncSubscriptionRecharge({
              id: values.id,
              token: values.token,
              card_hash: cardHash
            }))
          })
          /* eslint-disable prefer-promise-reject-errors */
      })

      return Promise.resolve(promise).then(action => action)
    }
  }
})

const RecurringFormImplementation = RecurringForm({
  mapDispatchToProps: {
    submit: values => SubscriptionActions.asyncSubscriptionRecharge({
      id: values.id,
      token: values.token,
      process_at: values.process_at
    })
  }
})

class SubscriptionEditPage extends React.Component {
  componentDidMount () {
    const {
      match: { params },
      data,
      query,
      asyncSubscriptionFetch
    } = this.props

    !data && asyncSubscriptionFetch({
      id: params.id,
      token: query.token
    })
  }

  render () {
    const {
      match: { params },
      modificationType,
      asyncSubscriptionDelete,
      setModificationType,
      intl,
      loading,
      data,
      query
    } = this.props

    const initialValues = {
      id: params.id,
      token: query.token
    }
    const forms = {
      creditcard: CreditCardFormImplementation,
      recurring: RecurringFormImplementation
    }

    return !loading && !data ? <Loading /> : (
      <div className='routes--subscription-edit-page'>
        <Background contentSize={0} image={require('images/bg-login.png')}>
          <section className='section--choose-type'>
            <h1 style={{
              color: '#333',
              marginTop: 0,
              fontWeight: 'bold',
              fontSize: '2em'
            }}>
              <FormattedMessage
                id='page--subscription-edit.title'
                defaultMessage='Dados da Doação'
                />
            </h1>
            <p className='paragraph--helper-text'>
              <FormattedMessage
                id='page--subscription-edit.helper-text'
                defaultMessage='Selecione abaixo qual informação da sua doação quer alterar:'
              />
            </p>
            <div className='container--tab-buttons'>
              <button
                className={classnames(
                  'button--creditcard button',
                  { active: modificationType === 'creditcard' }
                )}
                onClick={() => setModificationType('creditcard')}
              >
                <FormattedMessage
                  id='page--subscription-edit.button.creditcard'
                  defaultMessage='Cartão de crédito'
                />
              </button>
              <button
                className={classnames(
                  'button--recurring button',
                  { active: modificationType === 'recurring' }
                )}
                onClick={() => setModificationType('recurring')}
              >
                <FormattedMessage
                  id='page--subscription-edit.button.recurring'
                  defaultMessage='Data da doação'
                />
              </button>
            </div>

            {Object.keys(forms).map(type => {
              const ChosenForm = forms[type]
              return modificationType !== type ? null : (
                <ChosenForm
                  {...this.props}
                  {...{ initialValues }}
                  key={type}
                  FormComponent={FlatForm}
                />
              )
            })}

            <p
              className='link--cancel center mt3 lightgray link'
              style={{ color: '#999999', cursor: 'pointer' }}
              onClick={() => {
                const message = intl.formatMessage({
                  id: 'page--subscription-edit.cancel-subscription.confirm',
                  defaultMessage: 'Você está prestes a cancelar sua assinatura. ' +
                    'Tem certeza que quer continuar?'
                })

                if (window.confirm(message)) {
                  asyncSubscriptionDelete(initialValues)
                }
              }}
            >
              <FormattedMessage
                id='page--subscription-edit.link.cancel-subscription'
                defaultMessage='Quero cancelar a minha assinatura.'
              />
            </p>
          </section>
        </Background>
      </div>
    )
  }
}

SubscriptionEditPage.propTypes = {
  intl: intlShape.isRequired
}

export default SubscriptionEditPage
