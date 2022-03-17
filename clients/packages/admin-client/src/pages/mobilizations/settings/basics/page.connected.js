//
// @route /mobilizations/:mobilization_id/basics
//
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import MobSelectors from '../../../../../mobrender/redux/selectors';
import * as MobActions from '../../../../../mobrender/redux/action-creators';
import {
  fields,
  validate,
} from '../../../../../mobilizations/components/mobilization-basics-form';

import Page from './page';

const form = 'mobilizationBasicsForm';

const mapStateToProps = (state, props) => {
  const mobilization = MobSelectors(state, props).getMobilization();
  return {
    formName: form,
    initialValues: mobilization,
    mobilization,
  };
};

const mapActionCreatorsToProps = {
  submit: MobActions.asyncUpdateMobilization,
};

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(injectIntl(reduxForm({ form, fields: [...fields, 'id'], validate })(Page)));
