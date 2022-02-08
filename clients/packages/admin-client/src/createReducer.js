import { combineReducers } from 'redux'

// Redux Form
import { reducer as form } from 'redux-form'
import { normalizer as creditCardForm } from 'subscriptions/forms/credit-card-form'
import { normalizer as recurringForm } from 'subscriptions/forms/recurring-form'

// Reapop
//import { reducer as notificationsReducer } from 'reapop'

// Application
import wait from 'components/await/redux/reducers'
import mobilizations from 'mobrender/redux/reducers'
import community from 'community/reducers'
import colorPicker from 'components/color-picker/reducers'
import subscriptions from 'subscriptions/redux/reducers'
import intl from 'intl/redux/reducers'

const initialState = {
  host: '',
  protocol: ''
}

const sourceRequest = (state = initialState, action = {}) => state

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
  return combineReducers({
    sourceRequest,
    form: form.normalize({
      creditCardForm,
      recurringForm
    }),
    wait,
    mobilizations,
    community,
    colorPicker,
    subscriptions,
    intl,
    ...asyncReducers
  })
}
