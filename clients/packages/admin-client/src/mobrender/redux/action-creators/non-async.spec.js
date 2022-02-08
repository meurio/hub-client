import { expect } from 'chai'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as MobActions from 'mobrender/redux/action-creators'
import * as t from 'mobrender/redux/action-types'
import { createAction } from 'mobrender/redux/action-creators/create-action'

describe('client/mobrender/redux/action-creators (non-async)', () => {
  let store

  beforeEach(() => {
    store = configureStore([ thunk ])()
  })

  describe('doing hover', () => {
    it('handleMouseOut', () => {
      const expected = createAction(t.MOUSE_OUT, { key: 'block' })
      store.dispatch(MobActions.handleMouseOut('block'))
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })

    it('handleMouseOver', () => {
      const expected = createAction(t.MOUSE_OVER, { key: 'block', id: 1 })
      store.dispatch(MobActions.handleMouseOver('block', 1))
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })
  })

  describe('doing edition', () => {
    it('handleEdit', () => {
      const expected = createAction(t.TURN_ON_EDITION, 'background')
      store.dispatch(MobActions.handleEdit('background'))
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })

    it('handleCancelEdit', () => {
      const expected = createAction(t.TURN_OFF_EDITION)
      store.dispatch(MobActions.handleCancelEdit())
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })
  })

  describe('doing upload (handleUploadFile)', () => {
    it('should dispatch LOADING_FILE when passed key and progress', () => {
      const expected = createAction(t.LOADING_FILE, { key: 'bg', progress: 10 })
      store.dispatch(MobActions.handleUploadFile('bg', 10))
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })

    it('should dispatch FINISH_LOADING_FILE when passed only key', () => {
      const expected = createAction(t.FINISH_LOADING_FILE, 'bg')
      store.dispatch(MobActions.handleUploadFile('bg'))
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })
  })

  it('#selectMobilization(mobilizationId)', () => {
    const mobilizationId = 10
    const expected = createAction(t.SELECT_MOBILIZATION, mobilizationId)
    store.dispatch(MobActions.selectMobilization(mobilizationId))
    expect(store.getActions().length).to.equal(1)
    expect(store.getActions()[0]).to.deep.equal(expected)
  })

  it('#toggleMobilizationMenu(mobilizationId)', () => {
    const mobilizationId = 9
    const expected = createAction(t.TOGGLE_MOBILIZATION_MENU, mobilizationId)
    store.dispatch(MobActions.toggleMobilizationMenu(mobilizationId))
    expect(store.getActions().length).to.equal(1)
    expect(store.getActions()[0]).to.deep.equal(expected)
  })

  it('#handleChangeBackground(block)', () => {
    const block = { id: 1, bg_image: 'tmp://old.png' }
    const expected = createAction(t.CHANGE_BLOCK_BACKGROUND, block)
    store.dispatch(MobActions.handleChangeBackground(block))
    expect(store.getActions().length).to.equal(1)
    expect(store.getActions()[0]).to.deep.equal(expected)
  })
})
