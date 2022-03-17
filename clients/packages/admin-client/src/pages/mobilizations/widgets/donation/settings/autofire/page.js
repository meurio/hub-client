import PropTypes from 'prop-types';
import React from 'react';

import { Loading } from '../../../../../../../components/await';
import { FormAutofire } from '../../../../../../../mobilizations/widgets/components';

const DonationSettingsAutofirePage = (props) =>
  !props.widget ? <Loading /> : <FormAutofire {...props} />;

DonationSettingsAutofirePage.propTypes = {
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired,
};

export default DonationSettingsAutofirePage;
