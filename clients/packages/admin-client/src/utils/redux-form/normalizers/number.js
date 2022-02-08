export default {
  max: max => value => {
    if (!value) return value

    const nums = value.replace(/[^\d]/g, '')
    return nums.slice(0, max)
  }
}
