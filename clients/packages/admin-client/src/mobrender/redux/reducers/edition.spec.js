import { expect } from 'chai'
import * as t from 'mobrender/redux/action-types'
import reducer, { initialState } from 'mobrender/redux/reducers/edition'

describe('mobrender/redux/reducers/edition', () => {
  describe('TURN_ON_EDITION', () => {
    it('should turn on edition mode', () => {
      const action = { type: t.TURN_ON_EDITION }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({...initialState,
        isEditing: true
      })
    })

    it('should set payload like mode', () => {
      const action = { type: t.TURN_ON_EDITION, payload: 'widget' }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({...initialState,
        isEditing: true,
        mode: 'widget'
      })
    })
  })

  describe('TURN_OFF_EDITION', () => {
    const turnOnState = {...initialState,
      isEditing: true,
      mode: 'background'
    }

    it('should turn off edition mode', () => {
      const action = { type: t.TURN_OFF_EDITION }
      const nextState = reducer(turnOnState, action)
      expect(nextState).to.deep.equal(initialState)
    })
  })
})
