import { expect } from 'chai'
import { fromJS } from 'immutable'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncDestroyBlock } from 'mobrender/redux/action-creators'
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
const mobilization = { id: 1 }
const block = data[0]

mockAxios.onDelete(
  `/mobilizations/${mobilization.id}/blocks/${block.id}`
).reply(200, block)

// Mock store
const store = configureStore(
  [thunk.withExtraArgument({ api: axios })]
)(fromJS(rootReducer).mergeDeep({
  mobilizations: {
    list: {
      data: [ mobilization ],
      currentId: mobilization.id
    },
    blocks: { data }
  }
}).toJS())

describe('@/mobrender/redux/action-creators/async-destroy-block', () => {
  it('should dispatch actions to destroy block', () => {
    const expectedActions = [
      createAction(t.DESTROY_BLOCK_REQUEST),
      createAction(t.DESTROY_BLOCK_SUCCESS, block)
    ]
    return store.dispatch(asyncDestroyBlock(block))
      .then(() => {
        expect(store.getActions().length).to.equal(2)
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])
      })
  })
})
