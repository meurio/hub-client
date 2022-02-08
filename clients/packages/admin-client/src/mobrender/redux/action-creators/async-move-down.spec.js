import { expect } from 'chai'
import { fromJS } from 'immutable'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncMoveDown } from 'mobrender/redux/action-creators'
import { createAction } from 'mobrender/redux/action-creators/create-action'
import * as t from 'mobrender/redux/action-types'

import rootReducer from './mock-reducers/root-reducer'

// Mock axios
const mockAxios = new MockAdapter(axios)
const data = [
  { id: 1, name: 'Lorem', position: 1 },
  { id: 2, name: 'Ipsum', position: 2 },
  { id: 3, name: 'Dolor', position: 3 }
]
mockAxios.onPut(
  `/mobilizations/1/blocks`,
  {
    mobilization_id: 1,
    blocks: [
      {...data[1], position: data[2].position},
      {...data[2], position: data[1].position}
    ]
  }
).reply(200, {
  blocks: {
    blocks: [
      {...data[1], position: data[2].position},
      {...data[2], position: data[1].position}
    ]
  }
})

// Mock store
const store = configureStore(
  [thunk.withExtraArgument({ api: axios })]
)(fromJS(rootReducer).mergeDeep({
  mobilizations: {
    list: {
      data: [ { id: 1, name: 'Mob' } ],
      currentId: 1
    },
    blocks: { data }
  }
}).toJS())

describe('@/mobrender/redux/action-creators/async-move-up', () => {
  it('should dispatch actions to move up block', () => {
    const blocks = {
      blocks: [
        { ...data[1], position: data[2].position },
        { ...data[2], position: data[1].position }
      ]
    }
    const expectedActions = [
      createAction(t.UPDATE_BLOCK_REQUEST),
      createAction(t.UPDATE_BLOCK_BATCH, { blocks })
    ]
    return store.dispatch(asyncMoveDown(data[1]))
      .then(() => {
        expect(store.getActions().length).to.equal(2)
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])
      })
  })
})
