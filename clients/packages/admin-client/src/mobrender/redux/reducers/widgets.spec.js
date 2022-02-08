import { expect } from 'chai'
import * as t from 'mobrender/redux/action-types'
import reducer, { initialState } from 'mobrender/redux/reducers/widgets'
import { createAction } from 'mobrender/redux/action-creators/create-action'

describe('mobrender/redux/reducers/widgets', () => {
  describe('doing fetch', () => {
    it('request', () => {
      const action = { type: t.FETCH_WIDGETS_REQUEST }
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
        { id: 1, kind: 'draft' },
        { id: 2, kind: 'draft' }
      ]
      const action = { type: t.FETCH_WIDGETS_SUCCESS, payload: data }
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
      const action = { type: t.FETCH_WIDGETS_FAILURE, payload: error }
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
        { id: 1, kind: 'draft' },
        { id: 2, kind: 'draft' }
      ]
    }

    const fetchRequestState = {...fetchState,
      saving: true
    }

    it('request', () => {
      const action = { type: t.UPDATE_WIDGET_REQUEST }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal(fetchRequestState)
    })

    it('success', () => {
      const widget = { id: 1, kind: 'content' }
      const action = { type: t.UPDATE_WIDGET_SUCCESS, payload: widget }
      const nextState = reducer(fetchRequestState, action)
      expect(nextState).to.deep.equal({...fetchRequestState,
        saving: false,
        data: fetchRequestState.data.map(w => {
          if (w.id === widget.id) return widget
          else return w
        })
      })
    })

    it('failure', () => {
      const error = '500 Internal Server Error'
      const action = { type: t.UPDATE_WIDGET_FAILURE, payload: error }
      const nextState = reducer(fetchRequestState, action)
      expect(nextState).to.deep.equal({...fetchRequestState,
        saving: false,
        error
      })
    })
  })

  describe('doing add widgets', () => {
    it('success', () => {
      const fetchState = {...initialState,
        isLoaded: true,
        data: [
          { id: 1, kind: 'draft', block_id: 2 },
          { id: 2, kind: 'draft', block_id: 2 }
        ]
      }
      const payload = [ { id: 3, kind: 'draft', block_id: 3 } ]
      const action = { type: t.ADD_WIDGETS_SUCCESS, payload }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal({...fetchState,
        data: [...fetchState.data, ...payload]
      })
    })
  })

  describe('add form entries', () => {
    it('should change saving state to true when requesting', () => {
      const action = { type: t.WIDGET_FORM_ENTRY_CREATE_REQUEST }
      const nextState = reducer(initialState, action)

      expect(nextState).to.have.property('saving', true)
    })
    it('should change saving state to false when succeeded', () => {
      const currentInitialState = { ...initialState, saving: true }
      const action = { type: t.WIDGET_FORM_ENTRY_CREATE_SUCCESS }
      const nextState = reducer(currentInitialState, action)

      expect(nextState).to.have.property('saving', false)
    })
    it('should change saving state to false and error state with message when failed', () => {
      const currentInitialState = { ...initialState, saving: true }
      const failurePayload = { error: 'Form widget entry create request error message!' }
      const action = createAction(t.WIDGET_FORM_ENTRY_CREATE_FAILURE, failurePayload)
      const nextState = reducer(currentInitialState, action)

      expect(nextState).to.have.property('saving', false)
      expect(nextState)
        .to.have.property('error')
        .that.is.an('object')
        .that.deep.equals(failurePayload)
    })
  })

  it('should reset widgets reducer when SELECT_MOBILIZATION', () => {
    const fetchState = {...initialState,
      isLoaded: true,
      data: [
        { id: 1, kind: 'draft', block_id: 1 }
      ]
    }
    const action = { type: t.SELECT_MOBILIZATION }
    const nextState = reducer(fetchState, action)
    expect(nextState).to.deep.equal(initialState)
  })
})
