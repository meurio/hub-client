import { typeCheck } from '../../../slate-editor-utils/src'

const Button: React.FC<any> = ({ children, id, onClick, className, style, type = 'button', ...properties }) =>
  <button
    id={id}
    style={style}
    type={type}
    onClick={(e) => typeCheck.isFunction(onClick) && onClick(e)}
    className={className}
    {...properties}
  >
    {children}
  </button>
;

export default Button
