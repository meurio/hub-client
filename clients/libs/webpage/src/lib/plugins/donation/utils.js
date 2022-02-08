import format from 'format-number'

//
// Options
//
const numberOptions = { integerSeparator: '.', decimal: ',' }
const currencyOptions = { ...numberOptions, prefix: 'R$ ', padRight: 2, truncate: 2 }
const currencyIntOptions = { ...currencyOptions, padRight: 0, truncate: 0 }
const floatOptions = { integerSeparator: '', decimal: '.', padRight: 2 }
const integerOptions = { integerSeparator: '', truncate: 0 }

//
// Helpers
//
const currency = format(currencyOptions)
const currencyInt = format(currencyIntOptions)
const number = format(numberOptions)
const float = format(floatOptions)
const integer = format(integerOptions)

export const numberUtils = { currency, currencyInt, number, float, integer }