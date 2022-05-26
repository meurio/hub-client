import React from 'react';
import {
  PluggableWidget,
} from '../';
const WidgetArea = ({
  block,
  widget,
  // widgetComponent: WidgetComponent,
  extraWidgetProps,
}: any) => {
  const { sm_size, md_size, lg_size } = widget;
  const containerClass = `widget px2 mb4 md-mb0 col col-${sm_size} sm-col-${sm_size} md-col-${md_size} lg-col-${lg_size}`;

  return (
    <div className={containerClass}>
      <PluggableWidget
        block={block}
        widget={widget}
        extraWidgetProps={extraWidgetProps}
      />
    </div>
  );
};

export default WidgetArea;
