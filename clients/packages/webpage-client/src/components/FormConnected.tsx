import React from 'react';
import {
  FormPlugin,
  // asyncFormEntryCreate,
  FormAnalytics,
  FormTellAFriend,
  FinishMessageCustom,
} from '../bonde-webpage';
import fetch from 'node-fetch';
// import { connect } from 'react-redux';
// import { injectIntl } from 'react-intl'
// import FormPlugin from '../../../src/plugins/Form'
// import { asyncFormEntryCreate } from '../../../src/redux/action-creators'

import Utils from '../Utils';

// const mapDispatchToProps = () => ({
//   asyncFormEntryCreate: async (args: any) =>
//     (
//       await fetch('/api/actions/form', {
//         method: 'post',
//         body: JSON.stringify(args),
//         headers: { 'Content-Type': 'application/json' },
//       })
//     ).json(),
// });

const FormConnected = (props: any) =>
  <FormPlugin
    {...props}
    asyncFormEntryCreate={async (args: any) =>
      (
        await fetch('/api/actions/form', {
          method: 'post',
          body: JSON.stringify(args),
          headers: { 'Content-Type': 'application/json' },
        })
      ).json()
    }
    widget={{
      ...props.widget,
      settings: {
        ...props.widget.settings,
        fields: props.widget.settings.fields
          ? JSON.parse(props.widget.settings.fields)
          : [],
      },
    }}
    analyticsEvents={FormAnalytics}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: {
        component: FormTellAFriend,
        props: {
          imageUrl: Utils.imageUrl,
          href: Utils.getSharedPath(props.mobilization),
        },
      },
    }}
  />
  ;

export default FormConnected;
