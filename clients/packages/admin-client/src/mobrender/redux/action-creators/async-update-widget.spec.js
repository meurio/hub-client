import { expect } from 'chai'
import { fromJS } from 'immutable'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncUpdateWidget } from 'mobrender/redux/action-creators'
import { createAction } from 'mobrender/redux/action-creators/create-action'
import * as t from 'mobrender/redux/action-types'

import rootReducer from './mock-reducers/root-reducer'

// Mock axios
const mockAxios = new MockAdapter(axios)
const data = [
  { id: 1, kind: 'draft' },
  { id: 2, kind: 'draft' },
  { id: 3, kind: 'draft' }
]

const widget = {...data[1], kind: 'content'}
const mobilization = { id: 1, name: 'Lorem ipsum' }
mockAxios.onPut(
  `/mobilizations/${mobilization.id}/widgets/${widget.id}`, { widget }
).reply(200, widget)

// Mock store
const store = configureStore(
  [thunk.withExtraArgument({ api: axios })]
)(fromJS(rootReducer).mergeDeep({
  mobilizations: {
    list: {
      data: [ mobilization ],
      currentId: mobilization.id
    },
    widgets: { data }
  }
}).toJS())

describe('@/mobrender/redux/action-creators/async-update-widget', () => {
  it('should dispatch actions to update widget', () => {
    const expectedActions = [
      createAction(t.UPDATE_WIDGET_REQUEST),
      createAction(t.UPDATE_WIDGET_SUCCESS, widget)
    ]
    return store.dispatch(asyncUpdateWidget(widget))
      .then(() => {
        expect(store.getActions().length).to.equal(2)
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])
      })
  })
})
