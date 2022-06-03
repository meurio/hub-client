// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Mobilization } from "../types"

export default (state?: any, props?: any) => ({

  getMobilization: (): Mobilization | undefined => {
    const { list: { currentId: id, data } } = state.mobilizations
    return id ? data.filter(mob => mob.id === id)[0] : undefined
  },

  mobilizationsIsLoading: () => {
    return state.mobilizations.list.fetching
  },

  mobilizationsIsLoaded: () => {
    return state.mobilizations.list.isLoaded
  },

  mobilizationIsSaving: () => {
    return state.mobilizations.list.saving
  },

  getMobilizationMenuActive: () => {
    return state.mobilizations.list.menuActiveIndex
  },

  getMobilizations: (filter?: any) => {
    const { list: { data } } = state.mobilizations
    if (filter && filter.status) {
      return data.filter(m => m.status === filter.status)
    }
    return data.filter(m => m.status === 'active')
  },

  hasCurrentMobilization: () => {
    return state.mobilizations.list.currentId
  },

  hasMouseOver: (key, id) => {
    const { hover } = state.mobilizations
    if (key in hover) return hover[key] === id
    else return false
  },

  getBlocks: () => {
    const { blocks: { data } } = state.mobilizations
    return data.sort((a, b) => a.position - b.position)
  },

  getBlockLastPosition: () => {
    const { blocks: { data } } = state.mobilizations
    const orderBy = (a, b) => a.position - b.position
    const lastIndex = data.length - 1
    return data.length > 0
      ? data.sort(orderBy)[lastIndex].position
      : 0
  },

  blocksIsLoaded: () => {
    return state.mobilizations.blocks.isLoaded
  },

  canMoveUp: () => {
    const { block } = props
    const { blocks: { data } } = state.mobilizations
    return data[0] && data[0].id !== block.id
  },

  canMoveDown: () => {
    const { block } = props
    const { blocks: { data } } = state.mobilizations
    const index = data.length - 1
    return data[index] && data[index].id !== block.id
  },

  getUploadProgress: (key) => {
    const { uploader } = state.mobilizations
    return uploader[key]
  },

  getEditing: () => {
    const { edition } = state.mobilizations
    return edition.isEditing ? edition.mode : undefined
  },

  getBlockSaving: () => {
    const { blocks: { saving } } = state.mobilizations
    return saving
  },

  getWidgets: () => {
    const { widgets: { data } } = state.mobilizations
    return data
  },

  getWidget: (id) => {
    const { widgets: { data, currentId } } = state.mobilizations
    let pkey
    if (props && props.match.params && props.match.params.widget_id) {
      pkey = parseInt(props.match.params.widget_id)
    } else if (id) {
      pkey = id
    } else {
      pkey = currentId
    }
    return data.filter(w => w.id === pkey)[0]
  },

  mobilizationIsNeedReload: () => {
    const {
      list: { reload },
      blocks: { isLoaded: blocksIsLoaded },
      widgets: { isLoaded: widgetsIsLoaded }
    } = state.mobilizations
    return !blocksIsLoaded || !widgetsIsLoaded ? true : reload
  },

  widgetsIsLoaded: () => {
    return state.mobilizations.widgets.isLoaded
  },

  widgetsIsLoading: () => {
    return state.mobilizations.widgets.saving
  },

  renderIsLoading: () => {
    const {
      widgets: {
        isLoaded: widgetsIsLoaded,
        fetching: widgetsIsLoading
      },
      blocks: {
        isLoaded: blocksIsLoaded,
        fetching: blocksIsLoading
      }
    } = state.mobilizations

    const isLoaded = blocksIsLoaded && widgetsIsLoaded
    const isntLoading = !blocksIsLoading && !widgetsIsLoading
    return !(isLoaded && isntLoading)
  },

  getPlugin: plugin => {
    if (!(plugin in state.mobilizations.plugins)) {
      console.error(`The [${plugin}] is not an available plugin`)
      return {}
    }
    return state.mobilizations.plugins[plugin]
  }
})

export const getTemplate = (state, ownProps) => {
  const { list: { data }, templates: { list: { templateId } } } = state.mobilizations
  return data.filter(mob => mob.id === templateId)[0]
}
