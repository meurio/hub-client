export function login() {
  return `/login`
}

export function logout() {
  return `/logout`
}

export function mobilizations(id) {
  return `/`
}

export function mobilization(id) {
  return `/mobilizations/${id}`
}

export function newMobilization() {
  return `/mobilizations/new`
}

export function editMobilization(id) {
  return `/mobilizations/${id}/edit`
}

export function basicsMobilization(id) {
  return `/mobilizations/${id}/basics`
}

export function cityMobilization(id) {
  return `/mobilizations/${id}/city`
}

export function cityNewMobilization(id) {
  return `/mobilizations/${id}/cityNew`
}

export function analyticsMobilization(id) {
  return `/mobilizations/${id}/analytics`
}

export function newMobilizationBlock(mobilization_id) {
  return `/mobilizations/${mobilization_id}/blocks/new`
}
