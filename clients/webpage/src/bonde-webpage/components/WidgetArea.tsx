import React from 'react';
import PropTypes from 'prop-types';

const WidgetArea = ({
  block,
  widget,
  widgetComponent: WidgetComponent,
  extraWidgetProps,
}: any) => {
  const { sm_size, md_size, lg_size } = widget;
  const containerClass = `widget px2 mb4 md-mb0 col col-${sm_size} sm-col-${sm_size} md-col-${md_size} lg-col-${lg_size}`;

  return (
    <div className={containerClass}>
      <WidgetComponent
        block={block}
        widget={widget}
        extraWidgetProps={extraWidgetProps}
      />
    </div>
  );
};

WidgetArea.propsTypes = {
  block: PropTypes.object,
  widget: PropTypes.object,
  /* Component responsible to render a widget logic,
   * receive { widget } props */
  widgetComponent: PropTypes.any.isRequired,
};

export default WidgetArea;
