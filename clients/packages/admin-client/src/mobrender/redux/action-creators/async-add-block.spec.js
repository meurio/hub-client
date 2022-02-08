import { expect } from 'chai'
import { fromJS } from 'immutable'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncAddBlock } from 'mobrender/redux/action-creators'
import { createAction } from 'mobrender/redux/action-creators/create-action'
import * as t from 'mobrender/redux/action-types'
import rootReducer from './mock-reducers/root-reducer'

// Mock axios
const mockAxios = new MockAdapter(axios)

const values = { bg_class: 'bg-1', bg_image: 'tmp://bgimage.png' }
const widget = { kind: 'draft', lg_size: 12, md_size: 12, sm_size: 12 }

const block = { ...values, widgets_attributes: [widget], position: 1 }
const rdata = { ...values, mobilization_id: 1, id: 1, widgets_attributes: [{ ...widget, id: 3 }], position: 1 }
mockAxios.onPost(`/mobilizations/1/blocks`, { block }).reply(201, rdata)

// Mock store
const store = configureStore(
  [thunk.withExtraArgument({ api: axios })]
)(fromJS(rootReducer).mergeDeep({
  mobilizations: {
    list: {
      data: [ { id: 1, name: 'Mob' } ],
      currentId: 1
    },
    blocks: { data: [] }
  }
}).toJS())

describe('@/mobrender/redux/action-creators/async-add-block', () => {
  it('should dispatch actions to add block', () => {
    const { widgets_attributes, ...data } = rdata
    const expectedActions = [
      createAction(t.ADD_BLOCK_REQUEST),
      createAction(t.ADD_BLOCK_SUCCESS, data),
      createAction(t.ADD_WIDGETS_SUCCESS, widgets_attributes)
    ]
    return store.dispatch(asyncAddBlock({ ...block, mobilization_id: 1 }))
      .then(res => {
        expect(store.getActions().length).to.equal(3)
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])
        expect(store.getActions()[2]).to.deep.equal(expectedActions[2])
      })
      .catch((err, res) => {
        console.log('err', err)
      })
  })
})
