import * as t from '../action-types'
import reducer, { initialState } from './mobilizations'

describe('reducers/mobilizations', () => {
  describe('doing add', () => {
    it('#ADD_MOBILIZATION_REQUEST', () => {
      const state = { ...initialState, isLoaded: true }
      const action = { type: t.ADD_MOBILIZATION_REQUEST }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        saving: true
      })
    })

    it('#ADD_MOBILIZATION_SUCCESS', () => {
      const state = { ...initialState, isLoaded: true, saving: true }
      const payload = { id: 1, name: 'Lorem', goal: 'Ipsum' }
      const action = { type: t.ADD_MOBILIZATION_SUCCESS, payload }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        saving: false,
        data: [...state.data, payload],
        currentId: payload.id
      })
    })

    it('#ADD_MOBILIZATION_FAILURE', () => {
      const state = { ...initialState, isLoaded: true, saving: true }
      const payload = '500 Internal Server Error'
      const action = { type: t.ADD_MOBILIZATION_FAILURE, payload }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        saving: false,
        error: payload
      })
    })
  })

  describe('doing fetch', () => {
    it('#FETCH_MOBILIZATIONS_REQUEST', () => {
      const action = { type: t.FETCH_MOBILIZATIONS_REQUEST }
      const nextState = reducer(initialState, action)
      expect(nextState).toEqual({
        ...initialState,
        fetching: true
      })
    })

    it('#FETCH_MOBILIZATIONS_SUCCESS', () => {
      const state = { ...initialState, fetching: true }
      const payload = [
        { id: 1, name: 'Lorem' },
        { id: 2, name: 'Ipsum' }
      ]
      const action = { type: t.FETCH_MOBILIZATIONS_SUCCESS, payload }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        isLoaded: true,
        fetching: false,
        data: payload
      })
    })

    it('#FETCH_MOBILIZATIONS_FAILURE', () => {
      const state = { ...initialState, fetching: true }
      const payload = '500 Internal Server Error'
      const action = { type: t.FETCH_MOBILIZATIONS_FAILURE, payload }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        isLoaded: true,
        fetching: false,
        error: payload
      })
    })
  })

  describe('doing select', () => {
    it('#SELECT_MOBILIZATION', () => {
      const state: any = {
        ...initialState,
        isLoaded: true,
        data: [
          { id: 1, name: 'Lorem' },
          { id: 2, name: 'Ipsum' }
        ]
      }
      const payload = 1
      const action = { type: t.SELECT_MOBILIZATION, payload }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        currentId: payload,
        reload: true
      })
    })
  })

  describe('doing update', () => {
    const data = [
      { id: 1, name: 'Lorem' },
      { id: 2, name: 'Ipsum' }
    ]
    const loadedState: any = { ...initialState, isLoaded: true, data }

    it('#UPDATE_MOBILIZATION_REQUEST', () => {
      const action = { type: t.UPDATE_MOBILIZATION_REQUEST }
      const nextState = reducer(loadedState, action)
      expect(nextState).toEqual({
        ...loadedState,
        saving: true
      })
    })

    it('#UPDATE_MOBILIZATION_SUCCESS', () => {
      const state = { ...loadedState, saving: true }
      const payload = { ...data[0], name: 'Edited' }
      const action = { type: t.UPDATE_MOBILIZATION_SUCCESS, payload }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        saving: false,
        data: [payload, data[1]]
      })
    })

    it('#UPDATE_MOBILIZATION_FAILURE', () => {
      const state = { ...loadedState, saving: true }
      const payload = '500 Internal Server Error'
      const action = { type: t.UPDATE_MOBILIZATION_FAILURE, payload }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        saving: false,
        error: payload
      })
    })
  })

  describe('doing toggle menu', () => {
    it('#TOGGLE_MOBILIZATION_MENU on', () => {
      const payload = 1
      const action = { type: t.TOGGLE_MOBILIZATION_MENU, payload }
      const nextState = reducer(initialState, action)
      expect(nextState).toEqual({
        ...initialState,
        menuActiveIndex: payload
      })
    })

    it('#TOGGLE_MOBILIZATION_MENU off', () => {
      const state = { ...initialState, menuActiveIndex: 1 }
      const action = { type: t.TOGGLE_MOBILIZATION_MENU, payload: 1 }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        menuActiveIndex: undefined
      })
    })
  })

  describe('doing filter', () => {
    it('#FILTER_MOBILIZATIONS_REQUEST', () => {
      const action = { type: t.FILTER_MOBILIZATIONS_REQUEST }
      const nextState = reducer(initialState, action)
      expect(nextState).toEqual({
        ...initialState,
        fetching: true
      })
    })

    it('#FILTER_MOBILIZATIONS_SUCCESS', () => {
      const state = { ...initialState, fetching: true }
      const payload = [
        { id: 2, name: 'Ipsum' }
      ]
      const action = { type: t.FILTER_MOBILIZATIONS_SUCCESS, payload }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        fetching: false,
        isLoaded: true,
        data: payload,
        currentId: payload[0].id
      })
    })

    it('#FILTER_MOBILIZATIONS_FAILURE', () => {
      const state = { ...initialState, fetching: true }
      const payload = '500 Internal Server Error'
      const action = { type: t.FILTER_MOBILIZATIONS_FAILURE, payload }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        fetching: false,
        isLoaded: true,
        error: payload
      })
    })
  })

  describe('finish fetch widgets and blocks', () => {
    const state = { ...initialState, reload: true }

    it('#FETCH_BLOCKS_SUCCESS', () => {
      const action = { type: t.FETCH_BLOCKS_SUCCESS }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        reload: false
      })
    })

    it('#FETCH_WIDGETS_SUCCESS', () => {
      const action = { type: t.FETCH_WIDGETS_SUCCESS }
      const nextState = reducer(state, action)
      expect(nextState).toEqual({
        ...state,
        reload: false
      })
    })
  })
})
