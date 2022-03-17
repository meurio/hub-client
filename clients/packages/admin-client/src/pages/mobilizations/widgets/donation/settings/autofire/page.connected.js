//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
//
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import MobSelectors from '../../../../../../../mobrender/redux/selectors';
import * as MobActions from '../../../../../../../mobrender/redux/action-creators';
import {
  fields,
  validate,
} from '../../../../../../../mobilizations/widgets/components/form-autofire';
import Page from './page';

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props);
  const widget = selectors.getWidget();

  return {
    initialValues: widget.settings || {},
    mobilization: selectors.getMobilization(),
    widget,
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
    reduxForm({
      form: 'donationAutofireForm',
      fields,
      validate,
    })(Page)
  )
);
