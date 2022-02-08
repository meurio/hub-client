import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncFetchMobilizations } from 'mobrender/redux/action-creators'
import { createAction } from 'mobrender/redux/action-creators/create-action'
import * as t from 'mobrender/redux/action-types'

import rootReducer from './mock-reducers/root-reducer'

// Mock axios
const mockAxios = new MockAdapter(axios)
const relationshipId = 1
const data = [
  { id: 1, name: 'Lorem', goal: 'Ipsum' },
  { id: 2, name: 'Dolor', goal: 'Sit' }
]
mockAxios.onGet(`/communities/${relationshipId}/mobilizations`).reply(200, data)

// Mock store
const store = configureStore(
  [thunk.withExtraArgument({ api: axios })]
)(rootReducer)

describe('client/morender/async-creators/async-fetch-mobilizations', () => {
  it('should dispatch actions to fetching mobilizations', () => {
    const expectedActions = [
      createAction(t.FETCH_MOBILIZATIONS_REQUEST),
      createAction(t.FETCH_MOBILIZATIONS_SUCCESS, data)
    ]
    return store.dispatch(asyncFetchMobilizations(relationshipId))
      .then(() => {
        expect(store.getActions().length).to.equal(2)
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])
      })
  })
})
