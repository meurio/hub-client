import * as validator from 'utils/validation-helper'

export const PRESSURE_TYPE_EMAIL = 'email'
export const PRESSURE_TYPE_PHONE = 'phone'
export const getType = (targets = []) => {
  if (targets.length) {
    if (validator.isValidTargetEmail(targets[0])) return PRESSURE_TYPE_EMAIL
    if (validator.isValidTargetPhone(targets[0])) return PRESSURE_TYPE_PHONE
    return 'invalid'
  }
}
