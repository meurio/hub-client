//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
//
import { connect } from 'react-redux'

import MobSelectors from 'mobrender/redux/selectors'
import * as MobActions from 'mobrender/redux/action-creators'

import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

const mapDispatchToProps = {
  asyncWidgetUpdate: MobActions.asyncUpdateWidget
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
