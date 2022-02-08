export const isLoading = state => state.mobilizations.templates.list.loading

export const isLoaded = state => state.mobilizations.templates.list.isLoaded

export const getGlobalTemplates = state => state.mobilizations.templates.list.global

export const getCustomTemplates = state => state.mobilizations.templates.list.custom

export const getFilterableTemplates = state => state.mobilizations.templates.filterable.list

export const getSelectableIndex = state => state.mobilizations.templates.selectable.selectedIndex
