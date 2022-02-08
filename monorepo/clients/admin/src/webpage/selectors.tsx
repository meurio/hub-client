import type { Block, Mobilization, State, Widget, StatePlugins } from "./reducers";

export interface StatusFilter {
  status: 'active' | 'archived';
}

export interface ISelectors {
  getMobilization: () => Mobilization | undefined;
  mobilizationsIsLoading: () => boolean;
  mobilizationsIsLoaded: () => boolean;
  mobilizationIsSaving: () => boolean;
  getMobilizationMenuActive: () => number | undefined;
  getMobilizations: (f?: StatusFilter) => Mobilization[];
  hasCurrentMobilization: () => number | undefined;
  hasMouseOver: (key: string, id: number) => boolean;
  getBlocks: () => Block[];
  getBlockLastPosition: () => number;
  blocksIsLoaded: () => boolean;
  canMoveUp: () => boolean;
  canMoveDown: () => boolean;
  getUploadProgress: (key: string) => number;
  getEditing: () => string | undefined;
  getBlockSaving: () => boolean;
  getWidgets: () => Widget[];
  getWidget: (id: number) => Widget | undefined;
  mobilizationIsNeedReload: () => boolean;
  widgetsIsLoaded: () => boolean;
  widgetsIsLoading: () => boolean;
  renderIsLoading: () => boolean;
  getPlugin: (plugin: keyof StatePlugins) => any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state: State, properties?: any): ISelectors => ({

  getMobilization: (): Mobilization | undefined => {
    const { currentId: id, data } = state.mobilizations
    return id ? data.find(mob => mob.id === id) : undefined
  },

  mobilizationsIsLoading: (): boolean => state.mobilizations.fetching,

  mobilizationsIsLoaded: (): boolean => state.mobilizations.isLoaded,

  mobilizationIsSaving: (): boolean => state.mobilizations.saving,

  getMobilizationMenuActive: (): number | undefined => state.mobilizations.menuActiveIndex,

  getMobilizations: (f?: StatusFilter): Mobilization[] => {
    const { data } = state.mobilizations
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (f) return data.filter(m => m.status === f.status);
  
    return data.filter(m => m.status === 'active');
  },

  hasCurrentMobilization: (): number | undefined => state.mobilizations.currentId,

  hasMouseOver: (key: string, id: number): boolean => {
    const { hover } = state;
    if (key in hover) return hover[key] === id;
    
    return false;
  },

  getBlocks: (): Block[] => {
    const { blocks: { data } } = state;
    return data.sort((a, b) => a.position - b.position);
  },

  getBlockLastPosition: (): number => {
    const { blocks: { data } } = state
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const lastIndex = data.length - 1;
    return data.length > 0
      ? data.sort((a, b) => a.position - b.position)[lastIndex].position
      : 0
  },

  blocksIsLoaded: (): boolean => state.blocks.isLoaded,

  canMoveUp: (): boolean => {
    const { block } = properties;
    const { blocks: { data } } = state;
    return data[0] && data[0].id !== block.id;
  },

  canMoveDown: (): boolean => {
    const { block } = properties
    const { blocks: { data } } = state;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const index = data.length - 1;
    return data[index] && data[index].id !== block.id;
  },

  getUploadProgress: (key: string): number => state.uploader[key],

  getEditing: (): string | undefined => {
    const { edition } = state
    return edition.isEditing ? edition.mode : undefined
  },

  getBlockSaving: (): boolean => {
    const { blocks: { saving } } = state;
    return saving;
  },

  getWidgets: (): Widget[] => state.widgets.data,

  getWidget: (id: number): Widget | undefined => {
    const { widgets: { data, currentId } } = state;
    let pkey: number;
    if (properties?.match.params?.widget_id) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      pkey = Number.parseInt(properties.match.params.widget_id, 10)
    } else if (id) {
      pkey = id
    } else {
      pkey = currentId || 0
    }

    return data.find(w => w.id === pkey);
  },

  mobilizationIsNeedReload: (): boolean => {
    const {
      mobilizations: { reload },
      blocks: { isLoaded: blocksIsLoaded },
      widgets: { isLoaded: widgetsIsLoaded }
    } = state;

    return !!(!blocksIsLoaded || !widgetsIsLoaded ? true : reload);
  },

  widgetsIsLoaded: (): boolean => state.widgets.isLoaded,

  widgetsIsLoading: (): boolean => state.widgets.saving,

  renderIsLoading: (): boolean => {
    const {
      widgets: {
        isLoaded: widgetsIsLoaded,
        fetching: widgetsIsLoading
      },
      blocks: {
        isLoaded: blocksIsLoaded,
        fetching: blocksIsLoading
      }
    } = state;

    const isLoaded = blocksIsLoaded && widgetsIsLoaded
    const isntLoading = !blocksIsLoading && !widgetsIsLoading

    return !(isLoaded && isntLoading)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPlugin: (plugin: keyof StatePlugins): any => state.plugins[plugin]
})

// export const getTemplate = (state, ownProperties) => {
//   const { list: { data }, templates: { list: { templateId } } } = state.mobilizations
//   return data.find(mob => mob.id === templateId)
// }
