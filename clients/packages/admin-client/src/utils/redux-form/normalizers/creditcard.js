//
// Reference:
// http://redux-form.com/5.3.1/#/examples/normalizing
//
export default (value, previousValue) => {
  if (!value) return value

  const nums = value.replace(/[^\d]/g, '')
  const sep = ' '
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (nums.length === 4) {
      return `${nums}${sep}`
    }
    if (nums.length === 8) {
      return `${nums.slice(0, 4)}${sep}${nums.slice(4)}${sep}`
    }
    if (nums.length === 12) {
      return `${nums.slice(0, 4)}${sep}${nums.slice(4, 8)}${sep}${nums.slice(8)}${sep}`
    }
  }
  if (nums.length <= 4) {
    return nums
  }
  if (nums.length <= 8) {
    return `${nums.slice(0, 4)}${sep}${nums.slice(4)}`
  }
  if (nums.length <= 12) {
    return `${nums.slice(0, 4)}${sep}${nums.slice(4, 8)}${sep}${nums.slice(8)}`
  }
  return `${nums.slice(0, 4)}${sep}${nums.slice(4, 8)}${sep}${nums.slice(8, 12)}${sep}${nums.slice(12, 16)}`
}
