const namespace = mobilization => `/mobilizations/${mobilization.id}/blocks`

export const createBlock = mobilization => `${namespace(mobilization)}/create`
