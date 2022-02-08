import sinon from 'sinon'
import test from 'ava'
import { FormAnalytics } from '.'

let sandbox

test.beforeEach(() => {
  sandbox = sinon.createSandbox()
  sandbox.spy(FormAnalytics, 'sendEvent')
})

test('should called sendEvent when form is filled ', t => {
  FormAnalytics.formIsFilled()
  t.true(FormAnalytics.sendEvent.called)
})

// formSavedData,
// formSocialShare,
// donationSetValue,
// donationFinishRequest,
// donationSocialShare,
// pressureIsFilled,
// pressureSavedData,
// pressureSocialShare
