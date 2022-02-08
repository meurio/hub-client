export const mobilizations = () => '/mobilizations'
export const mobilization = (mobilization, domain = process.env.REACT_APP_DOMAIN_PUBLIC) => {
  if (domain && domain.indexOf('staging') !== -1) {
    return `http://${mobilization.slug}.${domain}`
  }

  return mobilization.custom_domain
    ? `http://${mobilization.custom_domain}`
    : `http://${mobilization.slug}.${domain}`
}
export const mobilizationLaunch = id => `/mobilizations/${id}/launch`
export const mobilizationLaunchEnd = id => `/mobilizations/${id}/launch/end`
export const newMobilization = () => '/mobilizations/new'
export const editMobilization = id => `/mobilizations/${id}/edit`
export const cityMobilization = id => `/mobilizations/${id}/city`
export const cityNewMobilization = id => `/mobilizations/${id}/cityNew`
export const sharingMobilization = id => `/mobilizations/${id}/settings/sharing`
export const basicsMobilization = id => `/mobilizations/${id}/settings/basics`
export const analyticsMobilization = id => `/mobilizations/${id}/settings/analytics`
export const metricsMobilization = id => `/mobilizations/${id}/settings/metrics`
export const customDomainMobilization = id => `/mobilizations/${id}/settings/customDomain`
