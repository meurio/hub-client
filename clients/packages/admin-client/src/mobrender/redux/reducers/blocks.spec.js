import { expect } from 'chai'
import * as t from 'mobrender/redux/action-types'
import reducer, { initialState } from 'mobrender/redux/reducers/blocks'

describe('client/mobrender/redux/reducers/blocks', () => {
  describe('doing fetch', () => {
    it('request', () => {
      const action = { type: t.FETCH_BLOCKS_REQUEST }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        ...initialState,
        fetching: true
      })
    })

    it('success', () => {
      const requestState = {...initialState,
        fetching: true
      }
      const data = [
        { id: 1 },
        { id: 2 }
      ]
      const action = { type: t.FETCH_BLOCKS_SUCCESS, payload: data }
      const nextState = reducer(requestState, action)
      expect(nextState).to.deep.equal({...requestState,
        isLoaded: true,
        fetching: false,
        data
      })
    })

    it('failure', () => {
      const requestState = {...initialState,
        fetching: true
      }
      const error = '500 Internal Server Error'
      const action = { type: t.FETCH_BLOCKS_FAILURE, payload: error }
      const nextState = reducer(requestState, action)
      expect(nextState).to.deep.equal({...requestState,
        isLoaded: true,
        fetching: false,
        error
      })
    })
  })

  describe('doing update', () => {
    const fetchState = {...initialState,
      isLoaded: true,
      data: [
        { id: 1, name: 'Lorem' },
        { id: 2, name: 'Ipsum' }
      ]
    }

    const fetchRequestState = {...fetchState,
      saving: true
    }

    it('request', () => {
      const action = { type: t.UPDATE_BLOCK_REQUEST }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal(fetchRequestState)
    })

    it('success', () => {
      const block = { id: 1, name: 'Dolor' }
      const action = { type: t.UPDATE_BLOCK_SUCCESS, payload: block }
      const nextState = reducer(fetchRequestState, action)
      expect(nextState).to.deep.equal({...fetchRequestState,
        saving: false,
        data: fetchRequestState.data.map(b => {
          if (b.id === block.id) return block
          else return b
        })
      })
    })

    it('failure', () => {
      const error = '500 Internal Server Error'
      const action = { type: t.UPDATE_BLOCK_FAILURE, payload: error }
      const nextState = reducer(fetchRequestState, action)
      expect(nextState).to.deep.equal({...fetchRequestState,
        saving: false,
        error
      })
    })
  })

  describe('doing update block', () => {
    const data = [
      { id: 1, name: 'Lorem', bg_image: 'tmp://old.png' },
      { id: 2, name: 'Ipsum', bg_class: 'bg-5' }
    ]
    const fetchState = {...initialState,
      isLoaded: true,
      data
    }

    it('change background', () => {
      const payload = {...data[0], bg_image: 'tmp://new.png'}
      const action = { type: t.CHANGE_BLOCK_BACKGROUND, payload }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal({...nextState,
        data: [payload, data[1]]
      })
    })

    it('batch', () => {
      const payload = {
        blocks: {
          blocks: [
            {...data[0], bg_image: 'tmp://new.png'}
          ]
        }
      }

      const action = { type: t.UPDATE_BLOCK_BATCH, payload }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal({...nextState,
        data: [payload.blocks.blocks[0], data[1]]
      })
    })
  })

  describe('doing add', () => {
    const data = [
      { id: 1, name: 'Lorem', bg_image: 'tmp://old.png' },
      { id: 2, name: 'Ipsum', bg_class: 'bg-5' }
    ]
    const fetchState = {...initialState,
      isLoaded: true,
      data
    }

    it('request', () => {
      const action = { type: t.ADD_BLOCK_REQUEST }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal({...fetchState,
        saving: true
      })
    })

    it('success', () => {
      const payload = { id: 3, name: 'Dolor', bg_class: 'bg-2' }
      const state = { ...fetchState, saving: true }
      const action = { type: t.ADD_BLOCK_SUCCESS, payload }
      const nextState = reducer(state, action)
      expect(nextState).to.deep.equal({...state,
        saving: false,
        data: [...data, payload]
      })
    })

    it('failure', () => {
      const payload = '500 Internal server error'
      const state = { ...fetchState, saving: true }
      const action = { type: t.ADD_BLOCK_FAILURE, payload }
      const nextState = reducer(state, action)
      expect(nextState).to.deep.equal({...state,
        saving: false,
        error: payload
      })
    })
  })

  describe('doing destroy', () => {
    const data = [
      { id: 1, name: 'Lorem', bg_image: 'tmp://old.png' },
      { id: 2, name: 'Ipsum', bg_class: 'bg-5' }
    ]
    const fetchState = {...initialState,
      isLoaded: true,
      data
    }

    it('request', () => {
      const action = { type: t.DESTROY_BLOCK_REQUEST }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal({...fetchState,
        saving: true
      })
    })

    it('success', () => {
      const payload = data[0]
      const state = { ...fetchState, saving: true }
      const action = { type: t.DESTROY_BLOCK_SUCCESS, payload }
      const nextState = reducer(state, action)
      expect(nextState).to.deep.equal({...state,
        saving: false,
        data: data.filter(b => b.id !== payload.id)
      })
    })

    it('failure', () => {
      const payload = '500 Internal server error'
      const state = { ...fetchState, saving: true }
      const action = { type: t.DESTROY_BLOCK_FAILURE, payload }
      const nextState = reducer(state, action)
      expect(nextState).to.deep.equal({...state,
        saving: false,
        error: payload
      })
    })
  })

  it('should reset blocks reducer when SELECT_MOBILIZATION', () => {
    const fetchState = {...initialState,
      isLoaded: true,
      data: [
        { id: 1, name: 'Lorem', bg_class: 'bg-5' }
      ]
    }
    const action = { type: t.SELECT_MOBILIZATION }
    const nextState = reducer(fetchState, action)
    expect(nextState).to.deep.equal(initialState)
  })
})
