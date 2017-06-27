import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { FormattedMessage, intlShape } from 'react-intl'
import query from 'querystring'
import classnames from 'classnames'
import uuid from 'uuid'
import { Background } from '~client/components/layout'
import { CreditCardForm, RecurringForm } from '~client/subscriptions/forms'
import { FlatForm } from '~client/ux/components'
import * as SubscriptionActions from '~client/subscriptions/redux/action-creators'

if (require('exenv').canUseDOM) {
  require('./page.scss')
}

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
        PagarMe.encryption_key = process.env.PAGARME_KEY

        // eslint-disable-next-line
        const card = new PagarMe.creditCard()
        const expiration = values.expiration.match(/(\d{2})\/(\d{2})/)
        card.cardHolderName = values.name
        card.cardExpirationMonth = expiration[1]
        card.cardExpirationYear = expiration[2]
        card.cardNumber = values.creditcard
        card.cardCVV = values.cvv

        const errors = card.fieldErrors()

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

const SubscriptionEditPage = props => {
  const {
    params,
    url,
    modificationType,
    animationStack,
    asyncSubscriptionDelete,
    setModificationType,
    appendAnimationStack,
    removeAnimationStack,
    intl
  } = props

  const displayForm = (form, type) => {
    const append = () => {
      setModificationType(type)
      appendAnimationStack(form)
    }

    if (animationStack.length) {
      removeAnimationStack(0)
      setTimeout(append, 1000)
    } else append()
  }

  const initialValues = {
    id: params.id,
    token: query.parse(url.query).token
  }

  return (
    <div className='routes--subscription-edit-page'>
      <Background contentSize={0} image={
        require('exenv').canUseDOM
          ? require('~client/images/bg-login.png')
          : ''
      }>
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
              onClick={() => displayForm(CreditCardFormImplementation, 'creditcard')}
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
              onClick={() => displayForm(RecurringFormImplementation, 'recurring')}
            >
              <FormattedMessage
                id='page--subscription-edit.button.recurring'
                defaultMessage='Data da doação'
              />
            </button>
          </div>
          <CSSTransitionGroup
            transitionName={`transition--form-${modificationType}`}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            {animationStack.map(ItemComponent => (
              <div key={uuid()} style={{ overflowY: 'hidden' }}>
                <ItemComponent {...props} {...{ initialValues }} FormComponent={FlatForm} />
              </div>
            ))}
          </CSSTransitionGroup>
          <p className='link--cancel center mt3 lightgray link'>
            <a
              onClick={() => {
                const message = intl.formatMessage({
                  id: 'page--subscription-edit.cancel-subscription.confirm',
                  defaultMessage: 'Você está prestes a cancelar sua assinatura. ' +
                    'Tem certeza que quer continuar?'
                })

                if (window.confirm(message)) {
                  animationStack.length && removeAnimationStack(0)
                  asyncSubscriptionDelete(initialValues)
                }
              }}
            >
              <FormattedMessage
                id='page--subscription-edit.link.cancel-subscription'
                defaultMessage='Quero cancelar a minha assinatura.'
              />
            </a>
          </p>
        </section>
      </Background>
    </div>
  )
}

SubscriptionEditPage.propTypes = {
  intl: intlShape.isRequired
}

export default SubscriptionEditPage
