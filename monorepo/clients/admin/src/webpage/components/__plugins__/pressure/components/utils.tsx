// eslint-disable-next-line unicorn/no-unsafe-regex
const regexTargetEmail = /[\sA-Za-zÀ-Úà-ú]+<(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Z\\a-z-]+\.)+[A-Za-z]{2,}))>/
export const isValidTargetEmail = value => regexTargetEmail.test(value)

// Regex to validate target with phone number
// eslint-disable-next-line unicorn/no-unsafe-regex
const regexTargetPhone = /^[\s'A-Za-zÀ-Úà-ú]+\s<(\+\d{2})?\d{6,7}-?\d{4}>$/
export const isValidTargetPhone = value => regexTargetPhone.test(value)

export const PRESSURE_TYPE_EMAIL = 'email'
export const PRESSURE_TYPE_PHONE = 'phone'

export const getType = (targets = []): string | undefined => {
  if (targets.length > 0) {
    if (isValidTargetEmail(targets[0])) return PRESSURE_TYPE_EMAIL
    if (isValidTargetPhone(targets[0])) return PRESSURE_TYPE_PHONE
    return 'invalid'
  }
}