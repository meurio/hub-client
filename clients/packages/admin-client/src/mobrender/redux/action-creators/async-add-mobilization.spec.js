import { expect } from 'chai'
import { fromJS } from 'immutable'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncAddMobilization } from 'mobrender/redux/action-creators'
import { createAction } from 'mobrender/redux/action-creators/create-action'
import * as t from 'mobrender/redux/action-types'

import rootReducer from './mock-reducers/root-reducer'

// Mock axios
const mockAxios = new MockAdapter(axios)
const mobilization = { name: 'Lorem', goal: 'Ipsum', community_id: 1 }
mockAxios.onPost(
  `/mobilizations`, { mobilization }
).reply(201, { ...mobilization, id: 2 })

// Mock store
const store = configureStore(
  [thunk.withExtraArgument({ api: axios })]
)(fromJS(rootReducer).mergeDeep({
  mobilizations: {
    list: {
      data: [ { id: 1, name: 'Mob' } ],
      currentId: 1
    }
  }
}).toJS())

describe('@/mobrender/redux/action-creators/async-add-mobilization', () => {
  it('should dispatch actions to add mobilization', () => {
    const expectedActions = [
      createAction(t.ADD_MOBILIZATION_REQUEST),
      createAction(t.ADD_MOBILIZATION_SUCCESS, { ...mobilization, id: 2 })
    ]
    return store.dispatch(asyncAddMobilization(mobilization))
      .then(() => {
        expect(store.getActions().length).to.equal(2)
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])
      })
  })
})
