import classnames from 'classnames';
import { Children, cloneElement } from 'react';

const SlateToolbar: React.FC<any> = ({ children, style, className, ...rest }) => {
  return <div className={classnames('editor--toolbar', className)} style={style}>
    {Children.map(children, (child) => cloneElement(child, rest))}
  </div>
}

export default SlateToolbar
