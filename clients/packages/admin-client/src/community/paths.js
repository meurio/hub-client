import urljoin from 'url-join';

const namespace = '/community'
const adminCanaryDomains = () => {
    window.location.href = urljoin(process.env.REACT_APP_DOMAIN_ADMIN_CANARY, '/community/domains')
}

export const communityAdd = () => `/communities/new`
export const communityDomain = () => `${namespace}/domain`
export const communityDomainCreate = next => `${adminCanaryDomains()}`
export const communityDomainEdit = domain => `${namespace}/domain/${domain.id}/edit`
export const communityInfo = () => `${namespace}/info`
export const communityList = () => `/communities`
export const communityMailchimp = () => `${namespace}/mailchimp`
export const communityRecipient = () => `${namespace}/recipient`
export const communityReport = () => `${namespace}/report`
export const communityTwilio = () => `${namespace}/twilio`
