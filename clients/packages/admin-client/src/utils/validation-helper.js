// eslint-disable-next-line
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const isValidEmail = email => regexEmail.test(email)

const regexDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
export const isValidDomain = domain => regexDomain.test(domain)

// Validates Google Analytics Code
const regexCodeUA = /((UA|YT|MO)-\d+-\d+)/i
const regexCodeGA = /G-\w+/i
export const isValidCodeGA = codeGA => regexCodeUA.test(codeGA) || regexCodeGA.test(codeGA)

const regexDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/ // 00/00/0000
export const date = value => ({
  ddmmyyyy: regexDDMMYYYY.test(value)
})

// Validate email from
export const isValidFromEmail = value => {
  const regex = /^[a-zà-úA-ZÀ-Ú0-9 ]+<(.*)>$/
  if (regex.test(value)) {
    const email = value.match(regex)[1]
    return isValidEmail(email)
  }
  return false
}

// Regex to validate Target (Ex.: Igor Santos <igor@nossascidades.org>)
// eslint-disable-next-line
const regexTargetEmail = /[a-zà-úA-ZÀ-Ú\s]+<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/
export const isValidTargetEmail = value => regexTargetEmail.test(value)

// Regex to validate phone number
// Validating only BRA phone numbers for now
const regexPhone = /^(\+\d{2})?\d{6,7}-?\d{4}$/
export const isValidPhone = phone => regexPhone.test(phone)

// Regex to validate phone numver in E.164 format
// Validating only BRA phone numbers for now
const regexPhoneE164 = /^\+\d{12,13}$/
export const isValidPhoneE164 = phone => regexPhoneE164.test(phone)

// Regex to validate target with phone number
const regexTargetPhone = /^[a-zà-úA-ZÀ-Ú\s']+\s<(\+\d{2})?\d{6,7}-?\d{4}>$/
export const isValidTargetPhone = value => regexTargetPhone.test(value)

// Regex to validate target with phone number in E.164 format
const regexTargetPhoneE164 = /^[a-zà-úA-ZÀ-Ú\s']+\s<\+\d{12,13}>$/
export const isValidTargetPhoneE164 = value => regexTargetPhoneE164.test(value)

// Validate if date is valid
export const isValidDate = ({ day, month, year }) => (
  new Date(`${year}-${month}-${day}`).toString() !== 'Invalid Date'
)
