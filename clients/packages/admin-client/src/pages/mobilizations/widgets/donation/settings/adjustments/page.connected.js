//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/donation
//
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  adjustmentsForm,
  createAdjustmentsForm,
} from '../../../../../../../mobrender/widgets/adjustments';
import MobSelectors from '../../../../../../../mobrender/redux/selectors';
import * as MobActions from '../../../../../../../mobrender/redux/action-creators';

const AdjustmentsSettingsForm = createAdjustmentsForm([
  'call_to_action',
  'button_text',
  'main_color',
]);

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props);

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget(),
  };
};

const mapDispatchToProps = {
  asyncWidgetUpdate: MobActions.asyncUpdateWidget,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(
    adjustmentsForm({ formName: 'donationAdjustsForm' })(
      AdjustmentsSettingsForm
    )
  )
);
