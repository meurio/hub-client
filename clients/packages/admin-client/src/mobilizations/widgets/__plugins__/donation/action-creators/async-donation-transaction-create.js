/* eslint-disable prefer-promise-reject-errors */
import { toast } from 'react-toastify'
import * as notifications from 'utils/notifications'
import { createAction } from './create-action'
import AnalyticsEvents from 'mobilizations/widgets/utils/analytics-events'
import * as t from '../action-types'
import { setDonationCustomerData } from '.'

const asyncDonationTransactionCreate = params => (dispatch, getState, { api, intl }) => {
  const state = getState()
  const endpoint = `/mobilizations/${params.mobilization_id}/donations`
  const body = { donation: genRequestPayload(params) }

  dispatch({ type: t.ASYNC_DONATION_TRANSACTION_CREATE_REQUEST })
  return api.post(endpoint, body)
    .then(response => {
      dispatch({ type: t.ASYNC_DONATION_TRANSACTION_CREATE_SUCCESS })

      if (state.mobilizations.plugins.donation.customerData) {
        dispatch(setDonationCustomerData(undefined))
      }

      AnalyticsEvents.donationFinishRequest()
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.ASYNC_DONATION_TRANSACTION_CREATE_FAILURE, failure))
      toast.error(notifications.genericRequestError(intl).message, { 
        autoClose: 5000,
        hideProgressBar: true,
      })

      if (failure.config && failure.config.data) {
        try {
          const failureData = JSON.parse(failure.config.data)
          dispatch(setDonationCustomerData(failureData.donation.customer))
        } catch (error) {
          console.error('Customer data is not parsable. Cannot store the customer data.')
          console.error(error)
        }
      }

      return Promise.reject({ _error: `Response ${JSON.stringify(failure)}` })
    })
}

export default asyncDonationTransactionCreate

const genRequestPayload = params => ({
  widget_id: params.widget_id,
  card_hash: params.card_hash,
  payment_method: params.payment_method,
  amount: params.amount,
  customer: params.customer,
  subscription: params.subscription,
  period: params.recurring_period
})
