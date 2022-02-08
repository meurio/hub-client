import { expect } from 'chai'
import * as t from 'mobrender/redux/action-types'
import { createAction } from 'mobrender/redux/action-creators/create-action'
import reducer from 'mobrender/redux/reducers/data-export'

describe('client/mobrender/redux/reducers/data-export', () => {
  it('should update state with loading property as true', () => {
    const action = { type: t.EXPORT_DATACLIP_REQUEST }
    const nextState = reducer(undefined, action)
    expect(nextState).to.have.deep.property('loading', true)
  })
  it('should update state with success property as true', () => {
    const action = { type: t.EXPORT_DATACLIP_SUCCESS }
    const nextState = reducer(undefined, action)
    expect(nextState.success).to.equal(true)
  })
  it('should update state with expected error', () => {
    const error = 'Foo bar error'
    const action = createAction(t.EXPORT_DATACLIP_FAILURE, error)
    const nextState = reducer(undefined, action)
    expect(nextState.error).to.equal(error)
  })
})
