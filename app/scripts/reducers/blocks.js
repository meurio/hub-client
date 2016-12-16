import superagent from 'superagent'

import {
  REQUEST_ASYNC_BLOCK_FETCH,
  SUCCESS_ASYNC_BLOCK_FETCH,
  FAILURE_ASYNC_BLOCK_FETCH,

  REQUEST_ASYNC_BLOCK_CREATE,
  SUCCESS_ASYNC_BLOCK_CREATE,
  FAILURE_ASYNC_BLOCK_CREATE,
} from '../../modules/mobilizations/blocks/action-types'

const REQUEST_EDIT_BLOCK = 'REQUEST_EDIT_BLOCK'
const SUCCESS_EDIT_BLOCK = 'SUCCESS_EDIT_BLOCK'
const FAILURE_EDIT_BLOCK = 'FAILURE_EDIT_BLOCK'

const REQUEST_FIND_BLOCKS = 'REQUEST_FIND_BLOCKS'
const SUCCESS_FIND_BLOCKS = 'SUCCESS_FIND_BLOCKS'
const FAILURE_FIND_BLOCKS = 'FAILURE_FIND_BLOCKS'

const EDIT_BLOCK = 'EDIT_BLOCK'
const REMOVE_BLOCK = 'REMOVE_BLOCK'
const MOVE_BLOCK_UP = 'MOVE_BLOCK_UP'
const MOVE_BLOCK_DOWN = 'MOVE_BLOCK_DOWN'

const initialState = {
  loaded: false,
  data: []
}

export default function blocks(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: false }
    case SUCCESS_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: true, data: action.payload }
    case FAILURE_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: true, error: action.payload }

    case REQUEST_ASYNC_BLOCK_CREATE:
      return { ...state, loaded: false }
    case SUCCESS_ASYNC_BLOCK_CREATE:
      return { ...state, loaded: true, data: state.data.concat([action.payload]) }
    case FAILURE_ASYNC_BLOCK_CREATE:
      return { ...state, loaded: true }

    case REQUEST_FIND_BLOCKS:
      return {...state, loaded: false}
    case SUCCESS_FIND_BLOCKS:
      return {...state, loaded: true, data: action.result }
    case FAILURE_FIND_BLOCKS:
      return {...state, loaded: true}

    case REQUEST_EDIT_BLOCK:
      return {...state}
    case SUCCESS_EDIT_BLOCK:
      const data = state.data.map(block => block.id === action.result.id ? action.result : block)
      return {...state, data}
    case FAILURE_EDIT_BLOCK:
      return {...state}
    case EDIT_BLOCK:
      return {...state,
        data: state.data.map(
          block => block.id === action.block.id ? action.block : block
        )
      }

    case MOVE_BLOCK_UP:
      return {...state,
        data: state.data.map((block, index) => {
          if (index + 1 < state.data.length && state.data[index + 1].id === action.block.id) {
            return action.block
          } else if (block.id === action.block.id) {
            return state.data[index - 1]
          }
          return block
        })
      }

    case MOVE_BLOCK_DOWN:
      return {...state,
        data: state.data.map((block, index) => {
          if (index > 0 && state.data[index - 1].id === action.block.id) {
            return action.block
          } else if (block.id === action.block.id) {
            return state.data[index + 1]
          }
          return block
        })
      }

    case REMOVE_BLOCK:
      return {...state,
        data: state.data.filter(block => action.block.id !== block.id)
      }

    default:
      return state
  }
}

export function isBlocksLoaded(globalState) {
  return globalState.blocks.loaded
}

export function findBlocks(options) {
  return {
    types: [REQUEST_FIND_BLOCKS, SUCCESS_FIND_BLOCKS, FAILURE_FIND_BLOCKS],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent
        .get(`${process.env.API_URL}/blocks`)
        .send(options)
        .end((err, res) => {
          if (err) {
            reject(res.body || err)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}

export function editBlock(params) {
  return {
    types: [REQUEST_EDIT_BLOCK, SUCCESS_EDIT_BLOCK, FAILURE_EDIT_BLOCK],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent
        .put(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks/${params.id}`)
        .set(params.credentials)
        .send({block: params.block})
        .end((err, res) => {
          if (err) {
            reject(res.body || err)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}
