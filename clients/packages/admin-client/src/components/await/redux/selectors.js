export default state => {
  const wait = state.wait

  return {
    getLoading: () => wait.loading
  }
}
