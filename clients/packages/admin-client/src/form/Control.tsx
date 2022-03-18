import React from 'react';
import classnames from 'classnames';

const Control: React.FC<any> = ({ children, className, layout }) => (
  <div
    className={classnames("form-group", className)}
    style={layout === 'inline' ? { paddingRight: '1rem' } : {}}
  >
    {children}
  </div>
);

export default Control;