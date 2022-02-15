import { selectors as Selectors } from '..';
import { initialState as blockInitialState } from '../reducers/Blocks';
import { initialState as listsInitialState } from '../reducers/Mobilizations';
import { initialState as widgetsInitialState } from '../reducers/Widgets';

const state = {
  mobilizations: {
    blocks: blockInitialState,
    widgets: widgetsInitialState,
    list: listsInitialState,
  },
};

describe('Test selectors', () => {
  const data = [
    { id: 1, name: 'Lorem', status: 'active', position: 2 },
    { id: 2, name: 'Ipsum', status: 'active', position: 3 },
    { id: 3, name: 'Dolor', status: 'archived', position: 1 },
  ];

  const nextState = {
    ...state,
    mobilizations: {
      ...state.mobilizations,
      list: {
        isLoaded: true,
        currentId: data[1].id,
        data,
      },
    },
  };

  it('should get current mobilization', () => {
    expect(Selectors(nextState).getMobilization()).toEqual(data[1]);
  });

  describe('Selectors mobilization list', () => {
    it('should get mobilizations list loading status accordingly', () => {
      const getState = (loading: boolean) => ({
        ...state,
        mobilizations: {
          ...state.mobilizations,
          list: {
            ...state.mobilizations.list,
            fetching: loading,
          },
        },
      });
      expect(Selectors(getState(true)).mobilizationsIsLoading()).toBe(true);
      expect(Selectors(getState(false)).mobilizationsIsLoading()).toBe(false);
    });

    it('should get mobilizations list isLoaded status accordingly', () => {
      const getState = (loading: boolean) => ({
        ...state,
        mobilizations: {
          ...state.mobilizations,
          list: {
            ...state.mobilizations.list,
            isLoaded: loading,
          },
        },
      });
      expect(Selectors(getState(true)).mobilizationsIsLoaded()).toBe(true);
      expect(Selectors(getState(false)).mobilizationsIsLoaded()).toBe(false);
    });

    it('should get mobilizations list menuActiveIndex value', () => {
      const menuActiveIndex = 4;
      const getState = (menuActiveIndex: number) => ({
        ...state,
        mobilizations: {
          ...state.mobilizations,
          list: {
            ...state.mobilizations.list,
            menuActiveIndex,
          },
        },
      });
      expect(
        Selectors(getState(menuActiveIndex)).getMobilizationMenuActive()
      ).toEqual(menuActiveIndex);
    });
  });

  describe('Widgets', () => {
    it('should get widgets saving status accordingly', () => {
      const getState = (loading: boolean) => ({
        ...state,
        mobilizations: {
          ...state.mobilizations,
          widgets: {
            ...state.mobilizations.widgets,
            saving: loading,
          },
        },
      });
      expect(Selectors(getState(true)).widgetsIsLoading()).toBe(true);
      expect(Selectors(getState(false)).widgetsIsLoading()).toBe(false);
    });

    it('should get widgets isLoaded status accordingly', () => {
      const getState = (isLoaded: boolean) => ({
        ...state,
        mobilizations: {
          ...state.mobilizations,
          widgets: {
            ...state.mobilizations.widgets,
            isLoaded,
          },
        },
      });
      expect(Selectors(getState(true)).widgetsIsLoaded()).toBe(true);
      expect(Selectors(getState(false)).widgetsIsLoaded()).toBe(false);
    });

    const widget = { id: 1, kind: 'draft' };
    const nextState = {
      ...state,
      mobilizations: {
        ...state.mobilizations,
        hover: {
          widget: widget.id,
        },
      },
    };

    it('should be true if (key, id) equals mouseOver in state', () => {
      expect(Selectors(nextState).hasMouseOver('widget', widget.id)).toBe(true);
    });

    it('should be false if (key, id) not equals mouseOver or not exists in state', () => {
      expect(Selectors(nextState).hasMouseOver('widget', 999)).toBe(false);
    });

    it('should return expected widgets', () => {
      const widgets = [
        { id: 1, kind: 'draft' },
        { id: 2, kind: 'draft' },
      ];

      const getState = (widgets: Array<{ id: number; kind: string }>) => ({
        ...state,
        mobilizations: {
          ...state.mobilizations,
          widgets: {
            ...state.mobilizations.widgets,
            data: widgets,
          },
        },
      });
      const selector = Selectors(getState(widgets));
      expect(selector.getWidgets()).toEqual(widgets);
    });
  });

  describe('Filters mobilizations by list data status', () => {
    const getState = (data: any) => ({
      ...state,
      mobilizations: {
        ...state.mobilizations,
        list: {
          ...state.mobilizations.list,
          data,
        },
      },
    });

    it('should return only active status by default', () => {
      expect(Selectors(getState(data)).getMobilizations()).toEqual(
        data.filter(m => m.status === 'active')
      );
    });

    it('should return only archived status', () => {
      expect(
        Selectors(getState(data)).getMobilizations({ status: 'archived' })
      ).toEqual(data.filter(m => m.status === 'archived'));
    });
  });

  describe('Blocks', () => {
    const nextState = {
      ...state,
      mobilizations: {
        ...state.mobilizations,
        blocks: {
          ...state.mobilizations.blocks,
          isLoaded: true,
          data,
        },
      },
    };

    it('should return blocks loaded in order', () => {
      const ordered = data.sort((a: any, b: any) => a.position - b.position);
      expect(Selectors(nextState).getBlocks()).toEqual(ordered);
    });

    it('should be true if props.block isnt first of data', () => {
      const selectors = Selectors(nextState, { block: data[1] });
      expect(selectors.canMoveUp()).toBe(true);
    });

    it('should be false if props.block is first of data', () => {
      const selectors = Selectors(nextState, { block: data[0] });
      expect(selectors.canMoveUp()).toBe(false);
    });

    it('should be true if props.block isnt last of data', () => {
      const selectors = Selectors(nextState, { block: data[1] });
      expect(selectors.canMoveDown()).toBe(true);
    });

    it('should be false if props.block is last of data', () => {
      const selectors = Selectors(nextState, { block: data[2] });
      expect(selectors.canMoveDown()).toBe(false);
    });

    it('should get mobilizations blocks isLoaded status accordingly', () => {
      const getState = (isLoaded: boolean) => ({
        ...state,
        mobilizations: {
          ...state.mobilizations,
          blocks: {
            ...state.mobilizations.blocks,
            isLoaded,
          },
        },
      });
      expect(Selectors(getState(true)).blocksIsLoaded()).toBe(true);
      expect(Selectors(getState(false)).blocksIsLoaded()).toBe(false);
    });

    it('should get mobilizations block saving status accordingly', () => {
      const getState = (saving: boolean) => ({
        ...state,
        mobilizations: {
          ...state.mobilizations,
          blocks: {
            ...state.mobilizations.blocks,
            saving,
          },
        },
      });
      expect(Selectors(getState(true)).getBlockSaving()).toBe(true);
      expect(Selectors(getState(false)).getBlockSaving()).toBe(false);
    });
  });

  describe('Blocks or Widget', () => {
    const setIsLoaded = (
      blocksIsLoaded: boolean,
      widgetsIsLoaded: boolean
    ) => ({
      ...state,
      mobilizations: {
        ...state.mobilizations,
        blocks: {
          ...state.mobilizations.blocks,
          isLoaded: blocksIsLoaded,
        },
        widgets: {
          ...state.mobilizations.widgets,
          isLoaded: widgetsIsLoaded,
        },
        list: {
          ...state.mobilizations.list,
          reload: false,
        },
      },
    });
    it('should return true when blocks or widgets isnt loaded', () => {
      expect(
        Selectors(setIsLoaded(false, false)).mobilizationIsNeedReload()
      ).toBe(true);
    });

    it('should return reload when blocks or widgets is loaded', () => {
      expect(
        Selectors(setIsLoaded(true, true)).mobilizationIsNeedReload()
      ).toBe(false);
    });

    const setFetching = (blockFetch: boolean, widgetFetch: boolean) => ({
      ...state,
      mobilizations: {
        ...state.mobilizations,
        blocks: {
          ...state.mobilizations.blocks,
          isLoaded: true,
          fetching: blockFetch,
        },
        widgets: {
          ...state.mobilizations.widgets,
          isLoaded: true,
          fetching: widgetFetch,
        },
      },
    });

    it('should return false when loaded widgets and block', () => {
      expect(Selectors(setFetching(false, false)).renderIsLoading()).toBe(
        false
      );
    });

    it('should return true when fetching widgets or block', () => {
      expect(Selectors(setFetching(true, false)).renderIsLoading()).toBe(true);
      expect(Selectors(setFetching(false, true)).renderIsLoading()).toBe(true);
    });
  });

  describe('Upload progress', () => {
    const nextState = {
      ...state,
      mobilizations: {
        ...state.mobilizations,
        uploader: {
          bgBlock: 50,
        },
      },
    };
    const selectors = Selectors(nextState);

    it('should return undefined when not exists key to upload', () => {
      expect(selectors.getUploadProgress('header')).toBe(undefined);
    });

    it('should return progress when exists key to upload', () => {
      expect(selectors.getUploadProgress('bgBlock')).toBe(50);
    });
  });

  describe('Get editing mode', () => {
    it('#getEditing', () => {
      const nextState = {
        ...state,
        mobilizations: {
          ...state.mobilizations,
          edition: {
            isEditing: true,
            mode: 'background',
          },
        },
      };
      expect(Selectors(nextState).getEditing()).toBe('background');
    });
  });
});
