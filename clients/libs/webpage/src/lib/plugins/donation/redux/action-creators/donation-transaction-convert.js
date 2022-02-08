const donationTransactionConvert = params => (dispatch, getState, { api, intl }) => {
  const endpoint = `/convert-donation`
  return api.get(endpoint, { params })
}
  
export default donationTransactionConvert
