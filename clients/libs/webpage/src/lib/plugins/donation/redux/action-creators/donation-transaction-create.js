const donationTransactionCreate = params => (dispatch, getState, { api, intl }) => {
  const endpoint = `/mobilizations/${params.mobilization_id}/donations`
  const body = { donation: genRequestPayload(params) }

  return api.post(endpoint, body)
}

export default donationTransactionCreate

const genRequestPayload = params => ({
  widget_id: params.widget_id,
  card_hash: params.card_hash,
  payment_method: params.payment_method,
  amount: params.amount,
  customer: params.customer,
  subscription: params.subscription,
  period: params.recurring_period
})
