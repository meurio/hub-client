import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncFetchWidgets } from 'mobrender/redux/action-creators'
import { createAction } from 'mobrender/redux/action-creators/create-action'
import * as t from 'mobrender/redux/action-types'

import rootReducer from './mock-reducers/root-reducer'

// Mock axios
const mockAxios = new MockAdapter(axios)
const mobilizationId = 1
const data = [
  { id: 1, kind: 'draft' },
  { id: 2, kind: 'draft' }
]
mockAxios.onGet(`/mobilizations/${mobilizationId}/widgets`).reply(200, data)

// Mock store
const store = configureStore(
  [thunk.withExtraArgument({ api: axios })]
)(rootReducer)

describe('client/morender/async-creators/async-fetch-widget', () => {
  it('should dispatch actions to fetching widgets', () => {
    const expectedActions = [
      createAction(t.FETCH_WIDGETS_REQUEST),
      createAction(t.FETCH_WIDGETS_SUCCESS, data)
    ]
    return store.dispatch(asyncFetchWidgets(mobilizationId))
      .then(() => {
        expect(store.getActions().length).to.equal(2)
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])
      })
  })
})
