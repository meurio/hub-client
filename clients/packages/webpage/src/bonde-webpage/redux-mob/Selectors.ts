export default (state: any, props: any = {}) => ({
  getMobilizationLink: () => {
    const {
      sourceRequest: { protocol, host },
    } = state;
    const {
      list: { currentId: id, data },
    } = state.mobilizations;
    const mobilization = id
      ? data.filter((mob: any) => mob.id === id)[0]
      : undefined;
    if (mobilization) {
      const { custom_domain: customDomain } = mobilization;
      return {
        href: customDomain || `${protocol}://${host}`,
      };
    }
    return false;
  },

  getMobilization: () => {
    const {
      list: { currentId: id, data },
    } = state.mobilizations;
    return id ? data.filter((mob: any) => mob.id === id)[0] : undefined;
  },

  mobilizationsIsLoading: (): boolean => state.mobilizations.list.fetching,

  mobilizationsIsLoaded: (): boolean => state.mobilizations.list.isLoaded,

  mobilizationIsSaving: (): boolean => state.mobilizations.list.saving,

  getMobilizationMenuActive: (): number =>
    state.mobilizations.list.menuActiveIndex,

  getMobilizations: (f?: any) => {
    const {
      list: { data },
    } = state.mobilizations;
    if (f && f.status) {
      return data.filter((m: any) => m.status === f.status);
    }
    return data.filter((m: any) => m.status === 'active');
  },

  hasCurrentMobilization: () => state.mobilizations.list.currentId,

  hasMouseOver: (key: any, id: any) => {
    const { hover } = state.mobilizations;
    if (key in hover) return hover[key] === id;
    return false;
  },

  getBlocks: () => {
    const {
      blocks: { data },
    } = state.mobilizations;
    return data.sort((a: any, b: any) => a.position - b.position);
  },

  getBlockLastPosition: () => {
    const {
      blocks: { data },
    } = state.mobilizations;
    const orderBy = (a: any, b: any) => a.position - b.position;
    const lastIndex = data.length - 1;
    return data.length > 0 ? data.sort(orderBy)[lastIndex].position : 1;
  },

  blocksIsLoaded: () => state.mobilizations.blocks.isLoaded,

  canMoveUp: () => {
    const { block } = props;
    const {
      blocks: { data },
    } = state.mobilizations;
    return data[0] && data[0].id !== block.id;
  },

  canMoveDown: () => {
    const { block } = props;
    const {
      blocks: { data },
    } = state.mobilizations;
    const index = data.length - 1;
    return data[index] && data[index].id !== block.id;
  },

  getUploadProgress: (key: any) => {
    const { uploader } = state.mobilizations;
    return uploader[key];
  },

  getEditing: () => {
    const { edition } = state.mobilizations;
    return edition.isEditing ? edition.mode : undefined;
  },

  getBlockSaving: () => {
    const {
      blocks: { saving },
    } = state.mobilizations;
    return saving;
  },

  getWidgets: () => {
    const {
      widgets: { data },
    } = state.mobilizations;
    return data;
  },

  getWidget: (id: any) => {
    const {
      widgets: { data, currentId },
    } = state.mobilizations;
    let pkey: number | string;
    if (props && props.match.params && props.match.params.widget_id) {
      pkey = parseInt(props.match.params.widget_id);
    } else if (id) {
      pkey = id;
    } else {
      pkey = currentId;
    }
    return data.filter((w: { id: number | string }) => w.id === pkey)[0];
  },

  mobilizationIsNeedReload: () => {
    const {
      list: { reload },
      blocks: { isLoaded: blocksIsLoaded },
      widgets: { isLoaded: widgetsIsLoaded },
    } = state.mobilizations;
    return !blocksIsLoaded || !widgetsIsLoaded ? true : reload;
  },

  widgetsIsLoaded: () => state.mobilizations.widgets.isLoaded,

  widgetsIsLoading: () => state.mobilizations.widgets.saving,

  renderIsLoading: () => {
    const {
      widgets: { isLoaded: widgetsIsLoaded, fetching: widgetsIsLoading },
      blocks: { isLoaded: blocksIsLoaded, fetching: blocksIsLoading },
    } = state.mobilizations;

    const isLoaded = blocksIsLoaded && widgetsIsLoaded;
    const isntLoading = !blocksIsLoading && !widgetsIsLoading;
    return !(isLoaded && isntLoading);
  },

  getPlugin: (plugin: any) => {
    if (!(plugin in state.mobilizations.plugins)) {
      console.error(`The [${plugin}] is not an available plugin`);
      return {};
    }
    return state.mobilizations.plugins[plugin];
  },
});

export const getTemplate = (state: any) => {
  const {
    list: { data },
    templates: {
      list: { templateId },
    },
  } = state.mobilizations;
  return data.filter(
    (mob: { id: number | string }) => mob.id === templateId
  )[0];
};
