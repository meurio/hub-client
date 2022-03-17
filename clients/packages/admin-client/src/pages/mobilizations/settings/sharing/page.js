import React from 'react';

import MobSelectors from '../../../../../mobrender/redux/selectors';
import * as MobActions from '../../../../../mobrender/redux/action-creators';
import { FormShare } from '../../../../../mobilizations/components';
import { SettingsForm } from '../../../../../ux/components';

if (require('exenv').canUseDOM) {
  require('./form-share.scss');
}

const FormShareImplementation = FormShare(
  (state) => ({ initialValues: MobSelectors(state).getMobilization() }),
  { submit: MobActions.asyncUpdateMobilization }
);

const MobilizationsSettingsSharingPage = (props) => (
  <FormShareImplementation
    {...props}
    FormComponent={SettingsForm}
    className="mobilization-settings-sharing--form-share transparent"
  />
);

export default MobilizationsSettingsSharingPage;
