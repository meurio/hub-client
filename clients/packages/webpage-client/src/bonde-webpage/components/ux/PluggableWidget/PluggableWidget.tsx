// import dynamic from 'next/dynamic'
import React from 'react';
import Overlay from './Overlay';
import FormPlugin from './../../../../components/FormConnected';
import PressureEmailPlugin from './../../../../components/PressureEmailConnected';
// import PressurePhonePlugin from './../../../../components/PressurePhoneConnected';
import PlipPlugin from './../../../../components/PlipConnected';
import DonationConnected from './../../../../components/DonationConnected';
// const FormPlugin = dynamic(() => import('./../../../../components/FormConnected'));
// const PressureEmailPlugin = dynamic(() => import('./../../../../components/PressureEmailConnected'));
// // import PressurePhonePlugin from './../../../../components/PressurePhoneConnected';
// const PlipPlugin = dynamic(() => import('./../../../../components/PlipConnected'));
// // import DonationConnected from './../../../../components/DonationConnected';
// const DonationConnected = dynamic(() => import('./../../../../components/DonationConnected'));


import {
  // Plugins
  ContentPlugin,
  DraftPlugin,
  // FinishMessageCustom,
  // selectors as MobilizationSelectors,
  // PressureAnalytics,
  // PressureTellAFriend,
} from '../../../../bonde-webpage';

const PluggableWidget = (props: any) => {
  const getOptions = (plugin: any) => {
    let options = { noOverlay: !props.editable };
    if (typeof plugin?.options === 'function') {
      options = Object.assign({}, options, plugin.options(props));
    } else if (typeof plugin?.options === 'object') {
      options = Object.assign({}, options, plugin.options);
    }
    return options;
  };

  const { block, widget, extraWidgetProps, onEdit, onDelete } = props;
  const plugins = [
    {
      kind: 'draft',
      component: DraftPlugin,
      options: { noOverlay: true },
    },
    {
      kind: 'form',
      component: FormPlugin,
    },
    {
      kind: 'donation',
      // component: DummyWidget,
      // component: DonationConnected,
      component: DonationConnected
    },
    {
      kind: 'pressure',
      // component: DummyWidget,
      component: PressureEmailPlugin,
      // component: (props: any) => (
      //   <PressureEmailPlugin
      //     {...props}
      //     analyticsEvents={PressureAnalytics}
      //     overrides={{
      //       FinishCustomMessage: { component: FinishMessageCustom },
      //       FinishDefaultMessage: {
      //         component: PressureTellAFriend,
      //         props: {
      //           imageUrl: Utils.imageUrl,
      //           href: Utils.getSharedPath(props.mobilization),
      //         },
      //       },
      //     }}
      //   />
      // ),
    },
    {
      kind: 'pressure-phone',
      // component: DummyWidget,
      component: () => <></>,
      // component: (props: any) => (
      //   <PressurePhonePlugin
      //     {...props}
      //     analyticsEvents={PressureAnalytics}
      //     overrides={{
      //       FinishCustomMessage: { component: FinishMessageCustom },
      //       FinishDefaultMessage: {
      //         component: PressureTellAFriend,
      //         props: {
      //           imageUrl: Utils.imageUrl,
      //           href: Utils.getSharedPath(props.mobilization),
      //         },
      //       },
      //     }}
      //   />
      // ),
    },
    {
      kind: 'content',
      // component: DummyWidget,
      component: ContentPlugin,
    },
    {
      kind: 'plip',
      component: PlipPlugin
    },
  ];

  const plugin: any = plugins.find(
    (p: any) => p.kind === widget.kind
  );

  const { noOverlay } = getOptions(plugin);
  extraWidgetProps.plugins = plugins;
  const widgetProps = {
    block,
    widget,
    ...extraWidgetProps,
  };

  return !noOverlay ? (
    <Overlay
      onEdit={() => onEdit && onEdit(widget)}
      onDelete={() => onDelete && onDelete(widget)}
    >
      <plugin.component {...widgetProps} />
    </Overlay>
  ) : (
    <plugin.component {...widgetProps} />
  );
};

PluggableWidget.defaultProps = {
  editable: false,
  plugins: [],
};

export default PluggableWidget;
