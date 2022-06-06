// import dynamic from 'next/dynamic'
import React from 'react';
import Overlay from './Overlay';
import FormPlugin from './../../../../components/FormConnected';
import PressureEmailPlugin from './../../../../components/PressureEmailConnected';
import PlipPlugin from './../../../../components/PlipConnected';
import DonationConnected from './../../../../components/DonationConnected';

import {
  ContentPlugin,
  DraftPlugin,
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

  const { block, widget, onEdit, onDelete, mobilization } = props;
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
      component: DonationConnected
    },
    {
      kind: 'pressure',
      component: PressureEmailPlugin,
    },
    {
      kind: 'pressure-phone',
      component: () => <></>,
    },
    {
      kind: 'content',
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
  const widgetProps = {
    block,
    widget,
    mobilization,
    editable: false,
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
