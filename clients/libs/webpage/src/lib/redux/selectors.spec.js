import test from 'ava'
import { fromJS } from 'immutable'
import {
  reducer as rootReducer,
  selectors as Selectors
} from '.'

const state = fromJS({
  mobilizations: rootReducer
});

(() => {
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
  
  test('should get current mobilization', t => {
    t.deepEqual(Selectors(nextState).getMobilization(), data[1])
  })
  
  test('#mobilizationsIsLoading', t => {
    const getState = loading => state.mergeDeep(fromJS({
      mobilizations: { list: { fetching: loading } }
    })).toJS()
    t.true(Selectors(getState(true)).mobilizationsIsLoading())
    t.false(Selectors(getState(false)).mobilizationsIsLoading())
  })
  
  test('#mobilizationsIsLoaded', t => {
    const getState = loading => state.mergeDeep(fromJS({
      mobilizations: { list: { isLoaded: loading } }
    })).toJS()
    t.true(Selectors(getState(true)).mobilizationsIsLoaded())
    t.false(Selectors(getState(false)).mobilizationsIsLoaded())
  })
  
  test('#widgtesIsLoading', t => {
    const getState = loading => state.mergeDeep(fromJS({
      mobilizations: { widgets: { saving: loading } }
    })).toJS()
    t.true(Selectors(getState(true)).widgetsIsLoading())
    t.false(Selectors(getState(false)).widgetsIsLoading())
  })
  
  test('#getMobilizationMenuActive', t => {
    const menuActiveIndex = 4
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: { list: { menuActiveIndex } }
    })).toJS()
    t.is(Selectors(getState()).getMobilizationMenuActive(), menuActiveIndex)
  })
})();

(() => {

  const data = [
    { id: 1, name: 'Lorem', status: 'active' },
    { id: 2, name: 'Ipsum', status: 'active' },
    { id: 3, name: 'Dolor', status: 'archived' }
  ]
  const getState = () => state.mergeDeep(fromJS({
    mobilizations: { list: { data } }
  })).toJS()
  
  test('should return only active status by default', t => {
    t.deepEqual(Selectors(getState()).getMobilizations(),
      data.filter(m => m.status === 'active'))
  })
  
  test('should return only filtered', t => {
    t.deepEqual(Selectors(getState()).getMobilizations({ status: 'archived' }), data.filter(m => m.status === 'archived'))
  })
  
  test('#blocksIsLoaded', t => {
    const getState = loaded => state.mergeDeep(fromJS({
      mobilizations: { blocks: { isLoaded: loaded } }
    })).toJS()
    t.true(Selectors(getState(true)).blocksIsLoaded())
    t.false(Selectors(getState(false)).blocksIsLoaded())
  })
  
  test('#widgetsIsLoaded', t => {
    const getState = loaded => state.mergeDeep(fromJS({
      mobilizations: { widgets: { isLoaded: loaded } }
    })).toJS()
    t.true(Selectors(getState(true)).widgetsIsLoaded())
    t.false(Selectors(getState(false)).widgetsIsLoaded())
  })
  
  test('should return false when loaded widgets and block', t => {
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: {
        widgets: { isLoaded: true, fetching: false },
        blocks: { isLoaded: true, fetching: false }
      }
    })).toJS()
    t.false(Selectors(getState()).renderIsLoading())
  })
  
  test('should return true when fetching widgets or block', t => {
    let getState = () => state.mergeDeep(fromJS({
      mobilizations: {
        widgets: { isLoaded: true, fetching: true },
        blocks: { isLoaded: true, fetching: false }
      }
    })).toJS()
    t.true(Selectors(getState()).renderIsLoading())
  
    getState = () => state.mergeDeep(fromJS({
      mobilizations: {
        widgets: { isLoaded: true, fetching: false },
        blocks: { isLoaded: true, fetching: true }
      }
    })).toJS()
    t.true(Selectors(getState()).renderIsLoading())
  })
})();

(() => {
  const widget = { id: 1, kind: 'draft' }
  const nextState = state.mergeDeep(fromJS({
    mobilizations: {
      hover: {
        'widget': widget.id
      }
    }
  })).toJS()
  
  test('should be true if (key, id) equals mouseOver in state', t => {
    const selectors = Selectors(nextState)
    t.true(selectors.hasMouseOver('widget', widget.id))
  })
  
  test('should be false if (key, id) not equals mouseOver or not exists in state', t => {
    const selectors = Selectors(nextState)
    t.false(selectors.hasMouseOver('widget', 999))
  })
})();

(() => {

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
  
  test('should be true if props.block isnt first of data', t => {
    const selectors = Selectors(nextState, { block: data[1] })
    t.true(selectors.canMoveUp())
  })
  
  test('should be false if props.block is first of data', t => {
    const selectors = Selectors(nextState, { block: data[0] })
    t.false(selectors.canMoveUp())
  })
  
  test('should be true if props.block isnt last of data', t => {
    const selectors = Selectors(nextState, { block: data[1] })
    t.true(selectors.canMoveDown())
  })
  
  test('should be false if props.block is last of data', t => {
    const selectors = Selectors(nextState, { block: data[2] })
    t.false(selectors.canMoveDown())
  })
})();

(() => {

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
  
  test('should return blocks loaded in order', t => {
    const selectors = Selectors(nextState)
    const ordered = data.sort((a, b) => a.position - b.position)
    t.deepEqual(selectors.getBlocks(), ordered)
  })
})();

(() => {
  const nextState = state.mergeDeep(fromJS({
    mobilizations: {
      uploader: {
        bgBlock: 50
      }
    }
  })).toJS()
  
  const selectors = Selectors(nextState)
  
  test('should return undefined when not exists key to upload', t => {
    t.is(selectors.getUploadProgress('header'), undefined)
  })
  
  test('should return progress when exists key to upload', t => {
    t.is(selectors.getUploadProgress('bgBlock'), 50)
  })
})();

(() => {

  const getSelector = merge => Selectors(state.mergeDeep(fromJS({
    mobilizations: { ...merge }
  })).toJS())
  
  test('#getEditing', t => {
    const s = getSelector({ edition: { isEditing: true, mode: 'background' } })
    t.is(s.getEditing(), 'background')
  })
  
  test('#getBlockSaving', t => {
    let s = getSelector({ blocks: { saving: true } })
    t.true(s.getBlockSaving())
  
    s = getSelector({ blocks: { saving: false } })
    t.false(s.getBlockSaving())
  })
  
  test('#getWidgets', t => {
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
    t.deepEqual(selector.getWidgets(), widgets)
  })
  
  test('should return true when blocks or widgets isnt loaded', t => {
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: {
        blocks: { isLoaded: false },
        widgets: { isLoaded: false },
        list: { reload: false }
      }
    })).toJS()
  
    const selector = Selectors(getState())
    t.true(selector.mobilizationIsNeedReload())
  })
  
  test('should return reload when blocks or widgets is loaded', t => {
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: {
        blocks: { isLoaded: true },
        widgets: { isLoaded: true },
        list: { reload: false }
      }
    })).toJS()
  
    const selector = Selectors(getState())
    t.false(selector.mobilizationIsNeedReload())
  })
})();
