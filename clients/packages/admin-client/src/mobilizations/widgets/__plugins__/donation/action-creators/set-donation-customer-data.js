import * as t from '../action-types'
import { createAction } from 'utils/redux'

const setDonationCustomerData = data => createAction(t.SET_DONATION_CUSTOMER_DATA, data)

export default setDonationCustomerData
