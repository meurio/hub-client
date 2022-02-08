import { expect } from 'chai'

import reducers, { initialState } from 'mobilizations/widgets/__plugins__/pressure/reducers'
import { createAction } from 'mobilizations/widgets/__plugins__/pressure/action-creators/create-action'
import * as t from 'mobilizations/widgets/__plugins__/pressure/action-types'

describe('client/mobilizations/widgets/__plugins__/pressure/reducers', () => {
  it('should change saving state to true when requesting', () => {
    const action = { type: t.WIDGET_PRESSURE_FILL_REQUEST }
    const nextState = reducers(initialState, action)

    expect(nextState).to.have.property('saving', true)
  })
  it(
    'should change saving state to false and filledPressureWidgets state' +
    ' with widget id when succeeded',
    () => {
      // state while requesting
      const currentInitialState = { ...initialState, saving: true, filledPressureWidgets: [] }
      const action = createAction(t.WIDGET_PRESSURE_FILL_SUCCESS, 1)
      const nextState = reducers(currentInitialState, action)

      expect(nextState).to.have.property('saving', false)
      expect(nextState)
        .to.have.property('filledPressureWidgets')
        .that.deep.equals([1])
    }
  )
  it('should change saving state to false and error state with message when failed', () => {
    // state while requesting
    const currentInitialState = { ...initialState, saving: true, filled: false }
    const failurePayload = { error: 'Pressure widget fill request error message!' }
    const action = createAction(t.WIDGET_PRESSURE_FILL_FAILURE, failurePayload)
    const nextState = reducers(currentInitialState, action)

    expect(nextState).to.have.property('saving', false)
    expect(nextState)
      .to.have.property('error')
      .that.is.an('object')
      .that.deep.equals(failurePayload)
  })
})
