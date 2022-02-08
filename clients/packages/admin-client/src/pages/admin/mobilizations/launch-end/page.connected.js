//
// @route /mobilizations/:mobilization_id/launch/end
//
import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { withRouter } from "react-router"

import MobSelectors from 'mobrender/redux/selectors'
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

const mapStateToProps = state => ({
  mobilization: MobSelectors(state).getMobilization()
})

export default provideHooks(redial)(
  connect(mapStateToProps)(withRouter(Page))
)
