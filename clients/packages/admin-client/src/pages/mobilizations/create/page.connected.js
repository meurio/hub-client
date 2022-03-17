//
// @route /mobilizations/new
//
import React from 'react';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import * as CommunitySelectors from '../../../community/selectors';
import {
  fields,
  validate,
} from '../../../mobilizations/components/mobilization-basics-form';
// import MobSelectors from '../../../../mobrender/redux/selectors';
import { asyncAddMobilization } from '../../../mobrender/redux/action-creators';

import Page from './page';
import { SidebarContext } from '../../sidebar/Provider';
import { useContext } from 'react';

const form = 'newMobilizationForm';

const mapStateToProps = (state, props) => {
  const community = CommunitySelectors.getCurrent(state);
  return {
    mobilization: props.mobilization,
    formName: form,
    initialValues: {
      ...(props.mobilization || {}),
      community_id: props.mobilization?.community_id || community.id,
    },
  };
};

const mapActionCreatorsToProps = {
  submit: asyncAddMobilization,
};

const ConnectedForm = injectIntl(
  reduxForm(
    { form, fields, validate },
    mapStateToProps,
    mapActionCreatorsToProps
  )(Page)
);

const MobilizationCreatePageConnected = (props) => {
  const { mobilization } = useContext(SidebarContext);

  return <ConnectedForm {...props} mobilization={mobilization} />;
}

export default MobilizationCreatePageConnected;