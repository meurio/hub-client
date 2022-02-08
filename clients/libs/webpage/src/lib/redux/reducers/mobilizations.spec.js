import test from 'ava'

import * as at from '../action-types'
import reducer, { initialState } from './mobilizations'

test('#ADD_MOBILIZATION_REQUEST', t => {
    const state = { ...initialState, isLoaded: true }
    const action = { type: at.ADD_MOBILIZATION_REQUEST }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        saving: true
    })
})

test('#ADD_MOBILIZATION_SUCCESS', t => {
    const state = { ...initialState, isLoaded: true, saving: true }
    const payload = { id: 1, name: 'Lorem', goal: 'Ipsum' }
    const action = { type: at.ADD_MOBILIZATION_SUCCESS, payload }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        saving: false,
        data: [
            payload,
            ...state.data,
        ],
        currentId: payload.id
    })
})

test('#ADD_MOBILIZATION_FAILURE', t => {
    const state = { ...initialState, isLoaded: true, saving: true }
    const payload = '500 Internal Server Error'
    const action = { type: at.ADD_MOBILIZATION_FAILURE, payload }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        saving: false,
        error: payload
    })
})

test('#FETCH_MOBILIZATIONS_REQUEST', t => {
    const action = { type: at.FETCH_MOBILIZATIONS_REQUEST }
    const nextState = reducer(initialState, action)
    t.deepEqual(nextState, {
        ...initialState,
        fetching: true
    })
})

test('#FETCH_MOBILIZATIONS_SUCCESS', t => {
    const state = { ...initialState, fetching: true }
    const payload = [
        { id: 1, name: 'Lorem' },
        { id: 2, name: 'Ipsum' }
    ]
    const action = { type: at.FETCH_MOBILIZATIONS_SUCCESS, payload }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        isLoaded: true,
        fetching: false,
        data: payload
    })
})

test('#FETCH_MOBILIZATIONS_FAILURE', t => {
    const state = { ...initialState, fetching: true }
    const payload = '500 Internal Server Error'
    const action = { type: at.FETCH_MOBILIZATIONS_FAILURE, payload }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        isLoaded: true,
        fetching: false,
        error: payload
    })
})

test('#SELECT_MOBILIZATION', t => {
    const state = {
        ...initialState,
        isLoaded: true,
        data: [
            { id: 1, name: 'Lorem' },
            { id: 2, name: 'Ipsum' }
        ]
    }
    const payload = 1
    const action = { type: at.SELECT_MOBILIZATION, payload }
    let nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        currentId: payload,
        reload: true
    })
})

const data = [
    { id: 1, name: 'Lorem' },
    { id: 2, name: 'Ipsum' }
]
const loadedState = { ...initialState, isLoaded: true, data }

test('#UPDATE_MOBILIZATION_REQUEST', t => {
    const action = { type: at.UPDATE_MOBILIZATION_REQUEST }
    const nextState = reducer(loadedState, action)
    t.deepEqual(nextState, {
        ...loadedState,
        saving: true
    })
})

test('#UPDATE_MOBILIZATION_SUCCESS', t => {
    const state = { ...loadedState, saving: true }
    const payload = { ...data[0], name: 'Edited' }
    const action = { type: at.UPDATE_MOBILIZATION_SUCCESS, payload }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        saving: false,
        data: [payload, data[1]]
    })
})

test('#UPDATE_MOBILIZATION_FAILURE', t => {
    const state = { ...loadedState, saving: true }
    const payload = '500 Internal Server Error'
    const action = { type: at.UPDATE_MOBILIZATION_FAILURE, payload }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        saving: false,
        error: payload
    })
})

test('#TOGGLE_MOBILIZATION_MENU on', t => {
    const payload = 1
    const action = { type: at.TOGGLE_MOBILIZATION_MENU, payload }
    const nextState = reducer(initialState, action)
    t.deepEqual(nextState, {
        ...initialState,
        menuActiveIndex: payload
    })
})

test('#TOGGLE_MOBILIZATION_MENU off', t => {
    const state = { ...initialState, menuActiveIndex: 1 }
    const action = { type: at.TOGGLE_MOBILIZATION_MENU, payload: 1 }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        menuActiveIndex: undefined
    })
})

test('#FILTER_MOBILIZATIONS_REQUEST', t => {
    const action = { type: at.FILTER_MOBILIZATIONS_REQUEST }
    const nextState = reducer(initialState, action)
    t.deepEqual(nextState, {
        ...initialState,
        fetching: true
    })
})

test('#FILTER_MOBILIZATIONS_SUCCESS', t => {
    const state = { ...initialState, fetching: true }
    const payload = [
        { id: 2, name: 'Ipsum' }
    ]
    const action = { type: at.FILTER_MOBILIZATIONS_SUCCESS, payload }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        fetching: false,
        isLoaded: true,
        data: payload,
        currentId: payload[0].id
    })
})

test('#FILTER_MOBILIZATIONS_FAILURE', t => {
    const state = { ...initialState, fetching: true }
    const payload = '500 Internal Server Error'
    const action = { type: at.FILTER_MOBILIZATIONS_FAILURE, payload }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        fetching: false,
        isLoaded: true,
        error: payload
    })
})

const state = { ...initialState, reload: true }

test('#FETCH_BLOCKS_SUCCESS', t => {
    const action = { type: at.FETCH_BLOCKS_SUCCESS }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        reload: false
    })
})

test('#FETCH_WIDGETS_SUCCESS', t => {
    const action = { type: at.FETCH_WIDGETS_SUCCESS }
    const nextState = reducer(state, action)
    t.deepEqual(nextState, {
        ...state,
        reload: false
    })
})
