import * as t from '../action-types'
import reducer from './dataExport'

describe('client/mobrender/redux/reducers/data-export', () => {
  it('should update state with loading property as true', () => {
    const action = { type: t.EXPORT_DATACLIP_REQUEST }
    const nextState = reducer(undefined, action)
    expect(nextState.loading).toEqual(true)
  })
  it('should update state with success property as true', () => {
    const action = { type: t.EXPORT_DATACLIP_SUCCESS }
    const nextState = reducer(undefined, action)
    expect(nextState.success).toEqual(true)
  })
  it('should update state with expected error', () => {
    const error = 'Foo bar error'
    const action = { type: t.EXPORT_DATACLIP_FAILURE, payload: error }
    const nextState = reducer(undefined, action)
    expect(nextState.error).toEqual(error)
  })
})
