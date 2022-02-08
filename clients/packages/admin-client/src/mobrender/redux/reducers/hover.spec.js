import { expect } from 'chai'
import reducer, { initialState } from 'mobrender/redux/reducers/hover'
import * as t from 'mobrender/redux/action-types'

describe('mobrender/redux/reducers/hover', () => {
  describe('doing MOUSE_OVER', () => {
    it('should add payload when not exists payload.key', () => {
      const action = { type: t.MOUSE_OVER, payload: { key: 'block', id: 2 } }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        block: action.payload.id
      })
    })

    it('should update id when exists payload.key', () => {
      const action = { type: t.MOUSE_OVER, payload: { key: 'block', id: 3 } }
      const nextState = reducer({ ...initialState, block: 1 }, action)
      expect(nextState).to.deep.equal({
        block: action.payload.id
      })
    })

    it('should add payload next to of other mode hover', () => {
      const state = { ...initialState, widget: 334 }
      const action = { type: t.MOUSE_OVER, payload: { key: 'block', id: 3 } }
      const nextState = reducer({ ...state }, action)
      expect(nextState).to.deep.equal({...state,
        [action.payload.key]: action.payload.id
      })
    })
  })

  describe('doing MOUSE_OUT', () => {
    const state = {...initialState,
      widget: 2,
      block: 223
    }

    it('should set undefined when exists payload.key without state change', () => {
      const action = { type: t.MOUSE_OUT, payload: { key: 'widget' } }
      const nextState = reducer(state, action)
      expect(nextState).to.deep.equal({...state,
        widget: undefined
      })
    })

    it('should hasnt state changed when payload.key not exists in state', () => {
      const action = { type: t.MOUSE_OUT, payload: { key: 'blocks' } }
      const nextState = reducer(state, action)
      expect(nextState).to.deep.equal(state)
    })
  })
})
