export default {
  onlyWords: value => {
    if (!value) return value
    return value.replace(/[^a-zà-ú\s]/gi, '')
  }
}
