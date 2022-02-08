import { expect } from 'chai'

import reducers, { initialState } from 'mobilizations/widgets/__plugins__/donation/reducers'
import { createAction } from 'mobilizations/widgets/__plugins__/donation/action-creators/create-action'
import * as t from 'mobilizations/widgets/__plugins__/donation/action-types'

describe('client/mobilizations/widgets/__plugins__/donation/reducers', () => {
  it('should return the initial state by default', () => {
    expect(reducers()).to.deep.equal(initialState)
  })
  it('should change saving state to true when requesting', () => {
    const action = { type: t.ASYNC_DONATION_TRANSACTION_CREATE_REQUEST }
    const nextState = reducers(initialState, action)

    expect(nextState).to.have.property('saving', true)
  })
  it('should change saving state to false when succeeded', () => {
    const currentInitialState = { ...initialState, saving: true }
    const action = { type: t.ASYNC_DONATION_TRANSACTION_CREATE_SUCCESS }
    const nextState = reducers(currentInitialState, action)

    expect(nextState).to.have.property('saving', false)
  })
  it('should change saving state to false and error state with message when failed', () => {
    const currentInitialState = { ...initialState, saving: true }
    const failurePayload = { error: 'Donation widget transaction create request error message!' }
    const action = createAction(t.ASYNC_DONATION_TRANSACTION_CREATE_FAILURE, failurePayload)
    const nextState = reducers(currentInitialState, action)

    expect(nextState).to.have.property('saving', false)
    expect(nextState)
      .to.have.property('error')
      .that.is.an('object')
      .that.deep.equals(failurePayload)
  })

  it('should set the donation customer data properly', () => {
    const payload = {
      name: 'Foo Bar',
      email: 'foo@bar.com',
      document_number: '12345678909',
      phone: {
        ddd: '12',
        number: '123123123'
      },
      address: {
        city: 'Teresina',
        complementary: 'Casa',
        neighborhood: 'Pirajá',
        state: 'PI',
        street: 'Avenida Bahia',
        street_number: '100',
        zipcode: '64003740'
      }
    }
    const action = createAction(t.SET_DONATION_CUSTOMER_DATA, payload)
    const nextState = reducers(initialState, action)

    expect(nextState)
      .to.have.property('customerData')
      .that.is.an('object')
      .that.deep.equals(payload)
  })
})
