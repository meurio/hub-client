// # arrayUtils

const distinct = (value, index, self) => self.indexOf(value) === index

const clean = array => array.filter(n => n)

const shuffle = array => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}


export const arrayUtils = { clean, distinct, shuffle }

// # pressureUtils

// Regex to validate Target (Ex.: Igor Santos <igor@nossascidades.org>)
// eslint-disable-next-line
const regexTargetEmail = /[a-zà-úA-ZÀ-Ú\s]+<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/
const isValidTargetEmail = value => regexTargetEmail.test(value)

// Regex to validate target with phone number
const regexTargetPhone = /^[a-zà-úA-ZÀ-Ú\s']+\s<(\+\d{2})?\d{6,7}-?\d{4}>$/
const isValidTargetPhone = value => regexTargetPhone.test(value)

const PRESSURE_TYPE_EMAIL = 'email'

const PRESSURE_TYPE_PHONE = 'phone'

const getType = (targets = []) => {
  if (targets.length) {
    if (isValidTargetEmail(targets[0])) return PRESSURE_TYPE_EMAIL
    if (isValidTargetPhone(targets[0])) return PRESSURE_TYPE_PHONE
    return 'invalid'
  }
}

export const pressureUtils = { getType, PRESSURE_TYPE_EMAIL, PRESSURE_TYPE_PHONE }

// # validateUtils
// eslint-disable-next-line
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isValidEmail = email => regexEmail.test(email)

// Regex to validate phone numver in E.164 format
// Validating only BRA phone numbers for now
const regexPhoneE164 = /^\+\d{12,13}$/
const isValidPhoneE164 = phone => regexPhoneE164.test(phone)

export const validateUtils = { isValidEmail, isValidPhoneE164 }

