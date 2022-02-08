import * as t from '../action-types'
import reducer from './uploader'

describe('mobrender/redux/reducers/uploader', () => {
  describe('t.LOADING_FILE', () => {
    it('should add key when not exists', () => {
      const action = { type: t.LOADING_FILE, payload: { key: 'bg', progress: 10 } }
      const nextState = reducer(undefined, action)
      expect(nextState).toEqual({
        bg: 10
      })
    })

    it('should update progress when exists key', () => {
      const initialState = { bg: 10 }
      const action = { type: t.LOADING_FILE, payload: { key: 'bg', progress: 50 } }
      const nextState = reducer(initialState, action)
      expect(nextState).toEqual({
        ...initialState,
        bg: 50
      })
    })
  })

  describe('t.FINISH_LOADING_FILE', () => {
    it('should remove key in state', () => {
      const initialState = { bg: 99 }
      const action = { type: t.FINISH_LOADING_FILE, payload: 'bg' }
      const nextState = reducer(initialState, action)
      expect(nextState).toEqual({})
    })
  })
})
