import test from 'ava'
import * as it from '../action-types'
import reducer, { initialState } from './widgets'
import { createAction } from '../action-creators/create-action'

test('#FETCH_WIDGETS_REQUEST', t => {
    const action = { type: it.FETCH_WIDGETS_REQUEST }
    const nextState = reducer(initialState, action)
    t.deepEqual(nextState, {
        ...initialState,
        fetching: true
    })
})

test('#FETCH_WIDGETS_SUCCESS', t => {
    const requestState = {
        ...initialState,
        fetching: true
    }
    const data = [
        { id: 1, kind: 'draft' },
        { id: 2, kind: 'draft' }
    ]
    const action = { type: it.FETCH_WIDGETS_SUCCESS, payload: data }
    const nextState = reducer(requestState, action)
    t.deepEqual(nextState, {
        ...requestState,
        isLoaded: true,
        fetching: false,
        data
    })
})

test('#FETCH_WIDGETS_FAILURE', t => {
    const requestState = {
        ...initialState,
        fetching: true
    }
    const error = '500 Internal Server Error'
    const action = { type: it.FETCH_WIDGETS_FAILURE, payload: error }
    const nextState = reducer(requestState, action)
    t.deepEqual(nextState, {
        ...requestState,
        isLoaded: true,
        fetching: false,
        error
    })
})

const fetchState = {
    ...initialState,
    isLoaded: true,
    data: [
        { id: 1, kind: 'draft' },
        { id: 2, kind: 'draft' }
    ]
}

const fetchRequestState = {
    ...fetchState,
    saving: true
}

test('#UPDATE_WIDGET_REQUEST', t => {
    const action = { type: it.UPDATE_WIDGET_REQUEST }
    const nextState = reducer(fetchState, action)
    t.deepEqual(nextState, fetchRequestState)
})

test('#UPDATE_WIDGET_SUCCESS', t => {
    const widget = { id: 1, kind: 'content' }
    const action = { type: it.UPDATE_WIDGET_SUCCESS, payload: widget }
    const nextState = reducer(fetchRequestState, action)
    t.deepEqual(nextState, {
        ...fetchRequestState,
        saving: false,
        data: fetchRequestState.data.map(w => {
            if (w.id === widget.id) return widget
            else return w
        })
    })
})

test('#UPDATE_WIDGET_FAILURE', t => {
    const error = '500 Internal Server Error'
    const action = { type: it.UPDATE_WIDGET_FAILURE, payload: error }
    const nextState = reducer(fetchRequestState, action)
    t.deepEqual(nextState, {
        ...fetchRequestState,
        saving: false,
        error
    })
})

test('#ADD_WIDGETS_SUCCESS', t => {
    const fetchState = {
        ...initialState,
        isLoaded: true,
        data: [
            { id: 1, kind: 'draft', block_id: 2 },
            { id: 2, kind: 'draft', block_id: 2 }
        ]
    }
    const payload = [{ id: 3, kind: 'draft', block_id: 3 }]
    const action = { type: it.ADD_WIDGETS_SUCCESS, payload }
    const nextState = reducer(fetchState, action)
    t.deepEqual(nextState, {
        ...fetchState,
        data: [...fetchState.data, ...payload]
    })
})

test('should change saving state to true when requesting', t => {
    const action = { type: it.WIDGET_FORM_ENTRY_CREATE_REQUEST }
    const nextState = reducer(initialState, action)

    t.truthy(nextState.saving)
})
test('should change saving state to false when succeeded', t => {
    const currentInitialState = { ...initialState, saving: true }
    const action = { type: it.WIDGET_FORM_ENTRY_CREATE_SUCCESS }
    const nextState = reducer(currentInitialState, action)

    t.false(nextState.saving)
})
test('should change saving state to false and error state with message when failed', t => {
    const currentInitialState = { ...initialState, saving: true }
    const failurePayload = { error: 'Form widget entry create request error message!' }
    const action = createAction(it.WIDGET_FORM_ENTRY_CREATE_FAILURE, failurePayload.error)
    const nextState = reducer(currentInitialState, action)

    t.false(nextState.saving)
    t.truthy(nextState.error)
    t.is(typeof nextState, 'object')
    t.deepEqual(nextState, {...currentInitialState, saving: false, ...failurePayload})
})

test('should reset widgets reducer when SELECT_MOBILIZATION', t => {
    const fetchState = {
        ...initialState,
        isLoaded: true,
        data: [
            { id: 1, kind: 'draft', block_id: 1 }
        ]
    }
    const action = { type: it.SELECT_MOBILIZATION }
    const nextState = reducer(fetchState, action)
    t.deepEqual(nextState, initialState)
})
