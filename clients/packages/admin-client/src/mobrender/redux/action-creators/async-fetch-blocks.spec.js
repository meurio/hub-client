import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncFetchBlocks } from 'mobrender/redux/action-creators'
import { createAction } from 'mobrender/redux/action-creators/create-action'
import * as t from 'mobrender/redux/action-types'

import rootReducer from './mock-reducers/root-reducer'

// Mock axios
const mockAxios = new MockAdapter(axios)
const mobilizationId = 1
const data = [
  { id: 1, name: 'Lorem', position: 1 },
  { id: 2, name: 'Ipsum', position: 2 },
  { id: 3, name: 'Dolor', position: 3 }
]
mockAxios.onGet(
  `/mobilizations/${mobilizationId}/blocks`
).reply(200, data)

// Mock store
const store = configureStore(
  [thunk.withExtraArgument({ api: axios })]
)(rootReducer)

describe('@/mobrender/redux/action-creators/async-fetch-blocks', () => {
  it('should dispatch actions to move up block', () => {
    const expectedActions = [
      createAction(t.FETCH_BLOCKS_REQUEST),
      createAction(t.FETCH_BLOCKS_SUCCESS, data)
    ]
    return store.dispatch(asyncFetchBlocks(mobilizationId))
      .then(() => {
        expect(store.getActions().length).to.equal(2)
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])
      })
  })
})
