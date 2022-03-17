//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
//
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import MobSelectors from '../../../../../../../mobrender/redux/selectors';
import * as MobActions from '../../../../../../../mobrender/redux/action-creators';
import { messagePressureTargetsRemoveAll } from '../../../../../../../utils/notifications';

import Page from './page';

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props);
  const widget = selectors.getWidget();

  return {
    initialValues: {
      show_city: 'city-false',
      ...(widget.settings || {}),
      targets: widget.settings && widget.settings.targets,
    },
    mobilization: selectors.getMobilization(),
    widget,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  notifyAllTargetsRemoval: () => {
    toast.sucess(messagePressureTargetsRemoveAll(props.intl).message, {
      autoClose: 5000,
      hideProgressBar: true,
    });
  },
  asyncWidgetUpdate: (...args) =>
    dispatch(MobActions.asyncUpdateWidget(...args)),
});

const validate = (values, { intl, widget }) => {
  const errors = {};
  const requiredMessage = intl.formatMessage({
    id: 'page--pressure-widget-email.form.validation.required',
    defaultMessage: 'Preenchimento obrigatório',
  });

  const isPressureByPhone = widget.kind === 'pressure-phone';

  if (!isPressureByPhone && !values.pressure_subject) {
    errors.pressure_subject = requiredMessage;
  }
  if (!isPressureByPhone && !values.pressure_body) {
    errors.pressure_body = requiredMessage;
  }
  return errors;
};

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    reduxForm({
      form: 'widgetsPressureSettingsEmailForm',
      fields: [
        'pressure_subject',
        'pressure_body',
        'targets',
        'disable_edit_field',
        'show_city',
      ],
      validate,
    })(Page)
  )
);
