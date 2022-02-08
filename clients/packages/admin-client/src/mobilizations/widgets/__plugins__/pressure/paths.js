const prefix = (mobilizationId, widgetId, path) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/${path}`

export const pressure = (mid, wid) => prefix(mid, wid, 'pressure')
export const pressureAutofire = (mid, wid) => prefix(mid, wid, 'pressure/autofire')
export const pressureEmail = (mid, wid) => prefix(mid, wid, 'pressure/email')
export const pressureFinish = (mid, wid) => prefix(mid, wid, 'pressure/finish')
