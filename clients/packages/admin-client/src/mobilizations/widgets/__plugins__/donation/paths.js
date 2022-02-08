const prefix = (mobilizationId, widgetId, path) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/${path}`

export const donation = (mid, wid) => prefix(mid, wid, 'donation')
export const donationAutofire = (mid, wid) => prefix(mid, wid, 'donation/autofire')
export const donationExport = (mid, wid) => prefix(mid, wid, 'donation/export')
export const donationFinish = (mid, wid) => prefix(mid, wid, 'donation/finish')
