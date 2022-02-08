export default state => {
  const edit = state.subscriptions.edit

  return {
    getData: () => edit.data,
    getModificationType: () => edit.modificationType,
    getAnimationStack: () => edit.animationStack,
    getCard: () => (
      edit.data &&
      edit.data.last_donation &&
      edit.data.last_donation.gateway_data &&
      edit.data.last_donation.gateway_data.card
    )
  }
}
