export default (value, previousValue) => {
  if (!value) return value

  const nums = value.replace(/[^\d]/g, '')
  const sep = '/'
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (nums.length === 2) {
      return `${nums}${sep}`
    }
    if (nums.length === 4) {
      return `${nums.slice(0, 2)}${sep}${nums.slice(2)}${sep}`
    }
  }
  if (nums.length <= 2) {
    return nums
  }
  if (nums.length <= 4) {
    return `${nums.slice(0, 2)}${sep}${nums.slice(2)}`
  }
  return `${nums.slice(0, 2)}${sep}${nums.slice(2, 4)}${sep}${nums.slice(4, 8)}`
}
