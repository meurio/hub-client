//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/form
//
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { adjustmentsForm, AdjustmentsSettingsForm } from 'mobrender/widgets/adjustments'
import MobSelectors from 'mobrender/redux/selectors'
import * as MobActions from 'mobrender/redux/action-creators'

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

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(
    adjustmentsForm({ formName: 'actionFormAdjustsForm' })(
      AdjustmentsSettingsForm
    )
  )
)
