// import dynamic from 'next/dynamic'
import React, { useMemo } from 'react';
import Overlay from './Overlay';
import FormPlugin from './../../../../components/FormConnected';
import PressureEmailPlugin from './../../../../components/PressureEmailConnected';
import PlipPlugin from './../../../../components/PlipConnected';
import PhoneWidgetConnected from '../../../../components/PhoneWidgetConnected';

import {
  ContentPlugin,
  DraftPlugin,
} from '../../../../bonde-webpage';

const PluggableWidget = React.memo((props: any) => {
  const getOptions = (plugin: any) => {
    let options = { noOverlay: !props.editable };
    if (typeof plugin?.options === 'function') {
      options = Object.assign({}, options, plugin.options(props));
    } else if (typeof plugin?.options === 'object') {
      options = Object.assign({}, options, plugin.options);
    }
    return options;
  };

  const { block, widget, onEdit, onDelete, mobilization, targets } = props;
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
      component: () => <></>,
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
    {
      kind: 'phone',
      component: PhoneWidgetConnected
    }
  ];

  const MemoPlugin: any = useMemo(() => {
    return plugins.find(
      (p: any) => p.kind === widget.kind)
  }, [])

  const { noOverlay } = getOptions(MemoPlugin);
  const widgetProps = {
    block,
    widget,
    mobilization,
    editable: false,
    targets
  };

  return !noOverlay ? (
    <Overlay
      onEdit={() => onEdit && onEdit(widget)}
      onDelete={() => onDelete && onDelete(widget)}
    >
      <MemoPlugin.component {...widgetProps} />
    </Overlay>
  ) : (
    <MemoPlugin.component {...widgetProps} />
  );
}) as any;

PluggableWidget.defaultProps = {
  editable: false,
  plugins: [],
};

export default PluggableWidget;
