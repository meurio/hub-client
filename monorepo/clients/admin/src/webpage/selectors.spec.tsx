import { fromJS, OrderedMap } from 'immutable'
import { initialState } from './reducers';
import type { State } from "./reducers";
import type { ISelectors } from './selectors';
import Selectors from './selectors';

const state = OrderedMap(fromJS(initialState));

describe('mobrender/redux/selectors', () => {
  describe('#getMobilizations', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const data = [{ id: 1, name: 'Lorem' }, { id: 2, name: 'Ipsum' }]
    const nextState: any = state.mergeDeep(fromJS({
      mobilizations: {
        isLoaded: true,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        currentId: data[1].id,
        data
      }
    })).toJS()

    it('should get current mobilization', () => {
      expect(Selectors(nextState).getMobilization()).toEqual(data[1])
    })
  })

  it('#mobilizationsIsLoading', () => {
    const getState = loading => state.mergeDeep(fromJS({
      mobilizations: { fetching: loading }
    })).toJS()
    expect(Selectors(getState(true) as any).mobilizationsIsLoading()).toEqual(true)
    expect(Selectors(getState(false) as any).mobilizationsIsLoading()).toEqual(false)
  })

  it('#mobilizationsIsLoaded', () => {
    const getState = loading => state.mergeDeep(fromJS({
      mobilizations: { isLoaded: loading }
    })).toJS()
    expect(Selectors(getState(true) as any).mobilizationsIsLoaded()).toEqual(true)
    expect(Selectors(getState(false) as any).mobilizationsIsLoaded()).toEqual(false)
  })

  it('#widgtesIsLoading', () => {
    const getState = loading => state.mergeDeep(fromJS({
      widgets: { saving: loading }
    })).toJS()
    expect(Selectors(getState(true) as any).widgetsIsLoading()).toEqual(true)
    expect(Selectors(getState(false) as any).widgetsIsLoading()).toEqual(false)
  })

  it('#getMobilizationMenuActive', () => {
    const menuActiveIndex = 4
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: { menuActiveIndex }
    })).toJS()
    expect(Selectors(getState() as any).getMobilizationMenuActive()).toEqual(menuActiveIndex)
  })

  describe('#getMobilizations', () => {
    const data = [
      { id: 1, name: 'Lorem', status: 'active' },
      { id: 2, name: 'Ipsum', status: 'active' },
      { id: 3, name: 'Dolor', status: 'archived' }
    ]
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: { data }
    })).toJS()

    it('should return only active status by default', () => {
      expect(Selectors(getState() as any).getMobilizations())
        .toEqual(data.filter(m => m.status === 'active'))
    })

    it('should return only filtered', () => {
      expect(Selectors(getState() as any).getMobilizations({ status: 'archived' }))
        .toEqual(data.filter(m => m.status === 'archived'))
    })
  })

  it('#blocksIsLoaded', () => {
    const getState = loaded => state.mergeDeep(fromJS({
      blocks: { isLoaded: loaded }
    })).toJS()
    expect(Selectors(getState(true) as any).blocksIsLoaded()).toEqual(true)
    expect(Selectors(getState(false) as any).blocksIsLoaded()).toEqual(false)
  })

  it('#widgetsIsLoaded', () => {
    const getState = loaded => state.mergeDeep(fromJS({
      widgets: { isLoaded: loaded }
    })).toJS()
    expect(Selectors(getState(true) as any).widgetsIsLoaded()).toEqual(true)
    expect(Selectors(getState(false) as any).widgetsIsLoaded()).toEqual(false)
  })

  describe('#renderIsLoading', () => {
    it('should return false when loaded widgets and block', () => {
      const getState = () => state.mergeDeep(fromJS({
        widgets: { isLoaded: true, fetching: false },
        blocks: { isLoaded: true, fetching: false }
      })).toJS()
      expect(Selectors(getState() as any).renderIsLoading()).toEqual(false)
    })

    it('should return true when fetching widgets or block', () => {
      let getState = () => state.mergeDeep(fromJS({
        widgets: { isLoaded: true, fetching: true },
        blocks: { isLoaded: true, fetching: false }
      })).toJS()
      expect(Selectors(getState() as any).renderIsLoading()).toEqual(true)

      getState = () => state.mergeDeep(fromJS({
        widgets: { isLoaded: true, fetching: false },
        blocks: { isLoaded: true, fetching: true }
      })).toJS()
      expect(Selectors(getState() as any).renderIsLoading()).toEqual(true)
    })
  })

  describe('#hasMouseOver', () => {
    // eslint-disable-next-line unicorn/no-unused-properties
    const widget = { id: 1, kind: 'draft' }
    const nextState: any = state.mergeDeep(fromJS({
      hover: {
        'widget': widget.id
      }
    })).toJS()

    it('should be true if (key, id) equals mouseOver in state', () => {
      const selectors = Selectors(nextState)
      expect(selectors.hasMouseOver('widget', widget.id)).toEqual(true)
    })

    it('should be false if (key, id) not equals mouseOver or not exists in state', () => {
      const selectors = Selectors(nextState)
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      expect(selectors.hasMouseOver('widget', 999)).toEqual(false)
    })
  })

  describe('move block', () => {
    const data = [
      { id: 1, name: 'Lorem' },
      { id: 2, name: 'Ipsum' },
      { id: 3, name: 'Dolor' }
    ]
    const nextState: any = state.mergeDeep(fromJS({
      blocks: {
        isLoaded: true,
        data
      }
    })).toJS()

    describe('#canMoveUp', () => {
      it('should be true if props.block isnt first of data', () => {
        const selectors = Selectors(nextState, { block: data[1] })
        expect(selectors.canMoveUp()).toEqual(true)
      })

      it('should be false if props.block is first of data', () => {
        const selectors = Selectors(nextState, { block: data[0] })
        expect(selectors.canMoveUp()).toEqual(false)
      })
    })

    describe('#canMoveDown', () => {
      it('should be true if props.block isnt last of data', () => {
        const selectors = Selectors(nextState, { block: data[1] })
        expect(selectors.canMoveDown()).toEqual(true)
      })

      it('should be false if props.block is last of data', () => {
        const selectors = Selectors(nextState, { block: data[2] })
        expect(selectors.canMoveDown()).toEqual(false)
      })
    })
  })

  describe('#getBlocks', () => {
    const data = [
      { id: 1, name: 'Lorem', position: 2 },
      { id: 2, name: 'Ipsum', position: 3 },
      { id: 3, name: 'Dolor', position: 1 }
    ]
    const nextState: any = state.mergeDeep(fromJS({
      blocks: {
        isLoaded: true,
        data
      }
    })).toJS()

    it('should return blocks loaded in order', () => {
      const selectors = Selectors(nextState)
      const ordered = data.sort((a, b) => a.position - b.position)
      expect(selectors.getBlocks()).toEqual(ordered)
    })
  })

  describe('#getUploadProgress(key)', () => {
    const nextState: any = state.mergeDeep(fromJS({
      uploader: {
        bgBlock: 50
      }
    })).toJS()

    const selectors = Selectors(nextState)

    it('should return undefined when not exists key to upload', () => {
      expect(selectors.getUploadProgress('header')).toEqual(undefined)
    })

    it('should return progress when exists key to upload', () => {
      expect(selectors.getUploadProgress('bgBlock')).toEqual(50)
    })
  })

  describe('about block edition', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const getSelector = (merge: State): ISelectors => {
      const nextState: any = state.mergeDeep(fromJS(merge)).toJS();
      return Selectors(nextState);
    }

    it('#getEditing', () => {
      const s = getSelector({ edition: { isEditing: true, mode: 'background' } } as any)
      expect(s.getEditing()).toEqual('background')
    })

    it('#getBlockSaving', () => {
      let s = getSelector({ blocks: { saving: true } } as any)
      expect(s.getBlockSaving()).toEqual(true)

      s = getSelector({ blocks: { saving: false } } as any)
      expect(s.getBlockSaving()).toEqual(false)
    })
  })

  it('#getWidgets', () => {
    const widgets = [
      { id: 1, kind: 'draft' },
      { id: 2, kind: 'draft' }
    ]
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getState = (): any => state.mergeDeep(fromJS({
      widgets: { data: widgets }
    })).toJS()

    const selector = Selectors(getState())
    expect(selector.getWidgets()).toEqual(widgets)
  })

  describe('#mobilizationIsNeedReload', () => {
    it('should return true when blocks or widgets isnt loaded', () => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const getState = (): any => state.mergeDeep(fromJS({
        blocks: { isLoaded: false },
        widgets: { isLoaded: false },
        mobilizations: { reload: false }
      })).toJS()

      const selector = Selectors(getState())
      expect(selector.mobilizationIsNeedReload()).toEqual(true)
    })

    it('should return reload when blocks or widgets is loaded', () => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const getState = (): any => state.mergeDeep(fromJS({
        blocks: { isLoaded: true },
        widgets: { isLoaded: true },
        mobilizations: { reload: false }
      })).toJS()

      const selector = Selectors(getState())
      expect(selector.mobilizationIsNeedReload()).toEqual(false)
    })
  })
})
