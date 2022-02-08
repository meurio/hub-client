//
// Reference:
// http://redux-form.com/5.3.1/#/examples/normalizing
//
export default {
  cpfCnpj: (value, previousValue) => {
    if (!value) return value

    const nums = value.replace(/[^\d]/g, '')

    // CPF: 000.000.000-00
    if (nums.length <= 11) {
      if (!previousValue || value.length > previousValue.length) { // typing forward
        if (nums.length === 3) {
          return `${nums}.`
        }
        if (nums.length === 6) {
          return `${nums.slice(0, 3)}.${nums.slice(3)}.`
        }
        if (nums.length === 9) {
          return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6)}-`
        }
      }
      if (nums.length <= 3) {
        return nums
      }
      if (nums.length <= 6) {
        return `${nums.slice(0, 3)}.${nums.slice(3)}`
      }
      if (nums.length <= 9) {
        return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6)}`
      }
      return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6, 9)}-${nums.slice(9, 11)}`
    }

    // CNPJ: 00.000.000/0000-00
    if (!previousValue || value.length > previousValue.length) { // typing forward
      if (nums.length === 12) {
        return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5, 8)}/${nums.slice(8, 12)}-`
      }
    }
    if (nums.length <= 12) {
      return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5, 8)}/${nums.slice(8, 12)}`
    }
    return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5, 8)}/${nums.slice(8, 12)}-${nums.slice(12, 14)}`
  }
}
