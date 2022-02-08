//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/donation/settings
//
import { connect } from 'react-redux'
import { donationForm, DonationSettingsForm } from 'mobrender/widgets/donations'
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
  donationForm(DonationSettingsForm)
)
