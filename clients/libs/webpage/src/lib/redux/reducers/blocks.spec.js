import test from 'ava'
import * as at from '../action-types'
import reducer, { initialState } from './blocks'

test('#FETCH_BLOCKS_REQUEST', t => {
    const action = { type: at.FETCH_BLOCKS_REQUEST }
    const nextState = reducer(initialState, action)
    t.deepEqual(nextState, {
        ...initialState,
        fetching: true
    })
})

test('#FETCH_BLOCKS_SUCCESS', t => {
    const requestState = {
        ...initialState,
        fetching: true
    }
    const data = [
        { id: 1 },
        { id: 2 }
    ]
    const action = { type: at.FETCH_BLOCKS_SUCCESS, payload: data }
    const nextState = reducer(requestState, action)
    t.deepEqual(nextState, {
        ...requestState,
        isLoaded: true,
        fetching: false,
        data
    })
})

test('#FETCH_BLOCKS_FAILURE', t => {
    const requestState = {
        ...initialState,
        fetching: true
    }
    const error = '500 Internal Server Error'
    const action = { type: at.FETCH_BLOCKS_FAILURE, payload: error }
    const nextState = reducer(requestState, action)
    t.deepEqual(nextState, {
        ...requestState,
        isLoaded: true,
        fetching: false,
        error
    })
});

(() => {
    const fetchState = {
        ...initialState,
        isLoaded: true,
        data: [
            { id: 1, name: 'Lorem' },
            { id: 2, name: 'Ipsum' }
        ]
    }

    const fetchRequestState = {
        ...fetchState,
        saving: true
    }

    test('#UPDATE_BLOCK_REQUEST', t => {
        const action = { type: at.UPDATE_BLOCK_REQUEST }
        const nextState = reducer(fetchState, action)
        t.deepEqual(nextState, fetchRequestState)
    })

    test('#UPDATE_BLOCK_SUCCESS', t => {
        const block = { id: 1, name: 'Dolor' }
        const action = { type: at.UPDATE_BLOCK_SUCCESS, payload: block }
        const nextState = reducer(fetchRequestState, action)
        t.deepEqual(nextState, {
            ...fetchRequestState,
            saving: false,
            data: fetchRequestState.data.map(b => {
                if (b.id === block.id) return block
                else return b
            })
        })
    })

    test('#UPDATE_BLOCK_FAILURE', t => {
        const error = '500 Internal Server Error'
        const action = { type: at.UPDATE_BLOCK_FAILURE, payload: error }
        const nextState = reducer(fetchRequestState, action)
        t.deepEqual(nextState, {
            ...fetchRequestState,
            saving: false,
            error
        })
    })
})();

(() => {
    const data = [
        { id: 1, name: 'Lorem', bg_image: 'tmp://old.png' },
        { id: 2, name: 'Ipsum', bg_class: 'bg-5' }
    ]
    const fetchState = {
        ...initialState,
        isLoaded: true,
        data
    }

    test('change background', t => {
        const payload = { ...data[0], bg_image: 'tmp://new.png' }
        const action = { type: at.CHANGE_BLOCK_BACKGROUND, payload }
        const nextState = reducer(fetchState, action)
        t.deepEqual(nextState, {
            ...nextState,
            data: [payload, data[1]]
        })
    })

    test('batch', t => {
        const payload = {
            blocks: {
                blocks: [
                    { ...data[0], bg_image: 'tmp://new.png' }
                ]
            }
        }

        const action = { type: at.UPDATE_BLOCK_BATCH, payload }
        const nextState = reducer(fetchState, action)
        t.deepEqual(nextState, {
            ...nextState,
            data: [payload.blocks.blocks[0], data[1]]
        })
    })
})();

(() => {

    const data = [
        { id: 1, name: 'Lorem', bg_image: 'tmp://old.png' },
        { id: 2, name: 'Ipsum', bg_class: 'bg-5' }
    ]
    const fetchState = {
        ...initialState,
        isLoaded: true,
        data
    }

    test('#ADD_BLOCK_REQUEST', t => {
        const action = { type: at.ADD_BLOCK_REQUEST }
        const nextState = reducer(fetchState, action)
        t.deepEqual(nextState, {
            ...fetchState,
            saving: true
        })
    })

    test('#ADD_BLOCK_SUCCESS', t => {
        const payload = { id: 3, name: 'Dolor', bg_class: 'bg-2' }
        const state = { ...fetchState, saving: true }
        const action = { type: at.ADD_BLOCK_SUCCESS, payload }
        const nextState = reducer(state, action)
        t.deepEqual(nextState, {
            ...state,
            saving: false,
            data: [...data, payload]
        })
    })

    test('failure', t => {
        const payload = '500 Internal server error'
        const state = { ...fetchState, saving: true }
        const action = { type: at.ADD_BLOCK_FAILURE, payload }
        const nextState = reducer(state, action)
        t.deepEqual(nextState, {
            ...state,
            saving: false,
            error: payload
        })
    })
})();

(() => {

    const data = [
        { id: 1, name: 'Lorem', bg_image: 'tmp://old.png' },
        { id: 2, name: 'Ipsum', bg_class: 'bg-5' }
    ]
    const fetchState = {
        ...initialState,
        isLoaded: true,
        data
    }

    test('request', t => {
        const action = { type: at.DESTROY_BLOCK_REQUEST }
        const nextState = reducer(fetchState, action)
        t.deepEqual(nextState, {
            ...fetchState,
            saving: true
        })
    })

    test('success', t => {
        const payload = data[0]
        const state = { ...fetchState, saving: true }
        const action = { type: at.DESTROY_BLOCK_SUCCESS, payload }
        const nextState = reducer(state, action)
        t.deepEqual(nextState, {
            ...state,
            saving: false,
            data: data.filter(b => b.id !== payload.id)
        })
    })

    test('#DESTROY_BLOCK_FAILURE', t => {
        const payload = '500 Internal server error'
        const state = { ...fetchState, saving: true }
        const action = { type: at.DESTROY_BLOCK_FAILURE, payload }
        const nextState = reducer(state, action)
        t.deepEqual(nextState, {
            ...state,
            saving: false,
            error: payload
        })
    })

    test('should reset blocks reducer when SELECT_MOBILIZATION', t => {
        const fetchState = {
            ...initialState,
            isLoaded: true,
            data: [
                { id: 1, name: 'Lorem', bg_class: 'bg-5' }
            ]
        }
        const action = { type: at.SELECT_MOBILIZATION }
        const nextState = reducer(fetchState, action)
        t.deepEqual(nextState, initialState)
    })
})();
