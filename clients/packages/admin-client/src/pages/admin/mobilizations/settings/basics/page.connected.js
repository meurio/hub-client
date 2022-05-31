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
  console.log("mobilization", { mobilization });
  return {
    formName: form,
    initialValues: {
      ...mobilization,
      subthemes: mobilization.mobilizations_subthemes.map(({ subtheme }) => subtheme.id),
      theme_id: mobilization.theme?.id
    },
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
