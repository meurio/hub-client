const prefix = (mobilizationId, widgetId, slug) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/${slug}`

export const formMobilizationWidget = (mid, wid) => prefix(mid, wid, 'form')
export const formAutofire = (mid, wid) => prefix(mid, wid, 'form/autofire')
export const formExport = (mid, wid) => prefix(mid, wid, 'form/export')
export const fieldsMobilizationWidget = (mid, wid) => prefix(mid, wid, 'form/fields')
export const widgetFormSettingsFinish = (mid, wid) => prefix(mid, wid, 'form/finish')
