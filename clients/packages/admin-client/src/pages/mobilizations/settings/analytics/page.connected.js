//
// @route /mobilizations/:mobilization_id/analytics
//
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import MobSelectors from '../../../../../mobrender/redux/selectors';
import * as MobActions from '../../../../../mobrender/redux/action-creators';
import { isValidCodeGA } from '../../../../../utils/validation-helper';

import Page from './page';

const mapStateToProps = (state, props) => {
  const mobilization = MobSelectors(state, props).getMobilization();
  return {
    initialValues: mobilization,
    mobilization,
  };
};

const mapActionCreatorsToProps = {
  submit: MobActions.asyncUpdateMobilization,
};

const validate = (values, { intl }) => {
  const errors = {};
  if (
    values.google_analytics_code &&
    !isValidCodeGA(values.google_analytics_code)
  ) {
    errors.google_analytics_code = intl.formatMessage({
      id: 'page--mobilizations-analytics.ol.form.ga-code.validation.invalid.ga-code.format',
      defaultMessage: 'Informe uma ID válida',
    });
  }
  return errors;
};

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(
  injectIntl(
    reduxForm({
      form: 'mobilizationAnalyticsForm',
      fields: ['id', 'google_analytics_code'],
      validate,
    })(Page)
  )
);
