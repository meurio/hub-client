import { expect } from 'chai'
import { fromJS } from 'immutable'

import { reducer as rootReducer } from 'mobrender/redux'
import Selectors from 'mobrender/redux/selectors'

const state = fromJS({
  mobilizations: rootReducer
})

describe('mobrender/redux/selectors', () => {
  describe('#getMobilizations', () => {
    const data = [{ id: 1, name: 'Lorem' }, { id: 2, name: 'Ipsum' }]
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        list: {
          isLoaded: true,
          currentId: data[1].id,
          data
        }
      }
    })).toJS()

    it('should get current mobilization', () => {
      expect(Selectors(nextState).getMobilization()).to.deep.equal(data[1])
    })
  })

  it('#mobilizationsIsLoading', () => {
    const getState = loading => state.mergeDeep(fromJS({
      mobilizations: { list: { fetching: loading } }
    })).toJS()
    expect(Selectors(getState(true)).mobilizationsIsLoading()).to.equal(true)
    expect(Selectors(getState(false)).mobilizationsIsLoading()).to.equal(false)
  })

  it('#mobilizationsIsLoaded', () => {
    const getState = loading => state.mergeDeep(fromJS({
      mobilizations: { list: { isLoaded: loading } }
    })).toJS()
    expect(Selectors(getState(true)).mobilizationsIsLoaded()).to.equal(true)
    expect(Selectors(getState(false)).mobilizationsIsLoaded()).to.equal(false)
  })

  it('#widgtesIsLoading', () => {
    const getState = loading => state.mergeDeep(fromJS({
      mobilizations: { widgets: { saving: loading } }
    })).toJS()
    expect(Selectors(getState(true)).widgetsIsLoading()).to.equal(true)
    expect(Selectors(getState(false)).widgetsIsLoading()).to.equal(false)
  })

  it('#getMobilizationMenuActive', () => {
    const menuActiveIndex = 4
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: { list: { menuActiveIndex } }
    })).toJS()
    expect(Selectors(getState()).getMobilizationMenuActive()).to.equal(menuActiveIndex)
  })

  describe('#getMobilizations', () => {
    const data = [
      { id: 1, name: 'Lorem', status: 'active' },
      { id: 2, name: 'Ipsum', status: 'active' },
      { id: 3, name: 'Dolor', status: 'archived' }
    ]
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: { list: { data } }
    })).toJS()

    it('should return only active status by default', () => {
      expect(Selectors(getState()).getMobilizations())
        .to.deep.equal(data.filter(m => m.status === 'active'))
    })

    it('should return only filtered', () => {
      expect(Selectors(getState()).getMobilizations({ status: 'archived' }))
        .to.deep.equal(data.filter(m => m.status === 'archived'))
    })
  })

  it('#blocksIsLoaded', () => {
    const getState = loaded => state.mergeDeep(fromJS({
      mobilizations: { blocks: { isLoaded: loaded } }
    })).toJS()
    expect(Selectors(getState(true)).blocksIsLoaded()).to.equal(true)
    expect(Selectors(getState(false)).blocksIsLoaded()).to.equal(false)
  })

  it('#widgetsIsLoaded', () => {
    const getState = loaded => state.mergeDeep(fromJS({
      mobilizations: { widgets: { isLoaded: loaded } }
    })).toJS()
    expect(Selectors(getState(true)).widgetsIsLoaded()).to.equal(true)
    expect(Selectors(getState(false)).widgetsIsLoaded()).to.equal(false)
  })

  describe('#renderIsLoading', () => {
    it('should return false when loaded widgets and block', () => {
      const getState = () => state.mergeDeep(fromJS({
        mobilizations: {
          widgets: { isLoaded: true, fetching: false },
          blocks: { isLoaded: true, fetching: false }
        }
      })).toJS()
      expect(Selectors(getState()).renderIsLoading()).to.equal(false)
    })

    it('should return true when fetching widgets or block', () => {
      let getState = () => state.mergeDeep(fromJS({
        mobilizations: {
          widgets: { isLoaded: true, fetching: true },
          blocks: { isLoaded: true, fetching: false }
        }
      })).toJS()
      expect(Selectors(getState()).renderIsLoading()).to.equal(true)

      getState = () => state.mergeDeep(fromJS({
        mobilizations: {
          widgets: { isLoaded: true, fetching: false },
          blocks: { isLoaded: true, fetching: true }
        }
      })).toJS()
      expect(Selectors(getState()).renderIsLoading()).to.equal(true)
    })
  })

  describe('#hasMouseOver', () => {
    const widget = { id: 1, kind: 'draft' }
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        hover: {
          'widget': widget.id
        }
      }
    })).toJS()

    it('should be true if (key, id) equals mouseOver in state', () => {
      const selectors = Selectors(nextState)
      expect(selectors.hasMouseOver('widget', widget.id)).to.equal(true)
    })

    it('should be false if (key, id) not equals mouseOver or not exists in state', () => {
      const selectors = Selectors(nextState)
      expect(selectors.hasMouseOver('widget', 999)).to.equal(false)
    })
  })

  describe('move block', () => {
    const data = [
      { id: 1, name: 'Lorem' },
      { id: 2, name: 'Ipsum' },
      { id: 3, name: 'Dolor' }
    ]
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        blocks: {
          isLoaded: true,
          data
        }
      }
    })).toJS()

    describe('#canMoveUp', () => {
      it('should be true if props.block isnt first of data', () => {
        const selectors = Selectors(nextState, { block: data[1] })
        expect(selectors.canMoveUp()).to.equal(true)
      })

      it('should be false if props.block is first of data', () => {
        const selectors = Selectors(nextState, { block: data[0] })
        expect(selectors.canMoveUp()).to.equal(false)
      })
    })

    describe('#canMoveDown', () => {
      it('should be true if props.block isnt last of data', () => {
        const selectors = Selectors(nextState, { block: data[1] })
        expect(selectors.canMoveDown()).to.equal(true)
      })

      it('should be false if props.block is last of data', () => {
        const selectors = Selectors(nextState, { block: data[2] })
        expect(selectors.canMoveDown()).to.equal(false)
      })
    })
  })

  describe('#getBlocks', () => {
    const data = [
      { id: 1, name: 'Lorem', position: 2 },
      { id: 2, name: 'Ipsum', position: 3 },
      { id: 3, name: 'Dolor', position: 1 }
    ]
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        blocks: {
          isLoaded: true,
          data
        }
      }
    })).toJS()

    it('should return blocks loaded in order', () => {
      const selectors = Selectors(nextState)
      const ordered = data.sort((a, b) => a.position - b.position)
      expect(selectors.getBlocks()).to.deep.equal(ordered)
    })
  })

  describe('#getUploadProgress(key)', () => {
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        uploader: {
          bgBlock: 50
        }
      }
    })).toJS()

    const selectors = Selectors(nextState)

    it('should return undefined when not exists key to upload', () => {
      expect(selectors.getUploadProgress('header')).to.equal(undefined)
    })

    it('should return progress when exists key to upload', () => {
      expect(selectors.getUploadProgress('bgBlock')).to.equal(50)
    })
  })

  describe('about block edition', () => {
    const getSelector = merge => Selectors(state.mergeDeep(fromJS({
      mobilizations: { ...merge }
    })).toJS())

    it('#getEditing', () => {
      const s = getSelector({ edition: { isEditing: true, mode: 'background' } })
      expect(s.getEditing()).to.equal('background')
    })

    it('#getBlockSaving', () => {
      let s = getSelector({ blocks: { saving: true } })
      expect(s.getBlockSaving()).to.equal(true)

      s = getSelector({ blocks: { saving: false } })
      expect(s.getBlockSaving()).to.equal(false)
    })
  })

  it('#getWidgets', () => {
    const widgets = [
      { id: 1, kind: 'draft' },
      { id: 2, kind: 'draft' }
    ]
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: {
        widgets: { data: widgets }
      }
    })).toJS()

    const selector = Selectors(getState())
    expect(selector.getWidgets()).to.deep.equal(widgets)
  })

  describe('#mobilizationIsNeedReload', () => {
    it('should return true when blocks or widgets isnt loaded', () => {
      const getState = () => state.mergeDeep(fromJS({
        mobilizations: {
          blocks: { isLoaded: false },
          widgets: { isLoaded: false },
          list: { reload: false }
        }
      })).toJS()

      const selector = Selectors(getState())
      expect(selector.mobilizationIsNeedReload()).to.equal(true)
    })

    it('should return reload when blocks or widgets is loaded', () => {
      const getState = () => state.mergeDeep(fromJS({
        mobilizations: {
          blocks: { isLoaded: true },
          widgets: { isLoaded: true },
          list: { reload: false }
        }
      })).toJS()

      const selector = Selectors(getState())
      expect(selector.mobilizationIsNeedReload()).to.equal(false)
    })
  })
})
