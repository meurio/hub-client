//
// @route /mobilizations/:mobilization_id/launch
//
import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import MobSelectors from 'mobrender/redux/selectors'
import DNSControlSelectors from 'community/dns-control-selectors'
import * as MobActions from 'mobrender/redux/action-creators'
import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobSelectors(state).hasCurrentMobilization() && promises.push(
      dispatch(MobActions.selectMobilization(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => {
  const selectors = MobSelectors(state)
  const hostedZones = DNSControlSelectors(state).dnsHostedZones().getList()
  return {
    mobilization: selectors.getMobilization(),
    isSaving: selectors.mobilizationIsSaving(),
    hostedZones
  }
}

export default provideHooks(redial)(
  connect(mapStateToProps)(Page)
)
