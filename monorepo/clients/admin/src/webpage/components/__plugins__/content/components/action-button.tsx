import classnames from 'classnames'

interface ActionButtonProperties {
  editing: boolean;
  onClick: (value: any, changeState: any) => void;
  changeState?: () => void;
  title?: string;
  style?: any;
  className?: string;
  value?: any;
}

const ActionButton: React.FC<ActionButtonProperties> = ({ children, editing, changeState, onClick, title, style = {}, className, value }) =>
  <button
    type="button"
    className={classnames('btn bg-blacker rounded', className)}
    onClick={() => onClick(value, changeState)}
    style={{
      position: 'relative',
      display: editing ? 'inline-block' : 'none',
      ...style
    }}
    title={title}
  >
    {children}
  </button>
;

export default ActionButton