import { expect } from 'chai'
import reducer from 'mobrender/redux/reducers/uploader'
import * as t from 'mobrender/redux/action-types'

describe('mobrender/redux/reducers/uploader', () => {
  describe('t.LOADING_FILE', () => {
    it('should add key when not exists', () => {
      const action = { type: t.LOADING_FILE, payload: { key: 'bg', progress: 10 } }
      const nextState = reducer(undefined, action)
      expect(nextState).to.deep.equal({
        bg: 10
      })
    })

    it('should update progress when exists key', () => {
      const initialState = { bg: 10 }
      const action = { type: t.LOADING_FILE, payload: { key: 'bg', progress: 50 } }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({...initialState,
        bg: 50
      })
    })
  })

  describe('t.FINISH_LOADING_FILE', () => {
    it('should remove key in state', () => {
      const initialState = { bg: 99 }
      const action = { type: t.FINISH_LOADING_FILE, payload: 'bg' }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({})
    })
  })
})
