import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { hasMark, underlineMarkStrategy } from './UnderlineUtils'

interface UnderlineButtonProperties {
  value?: any;
  onChange?: any;
  changeState?: any;
  className?: string;
  style?: any;
  type?: any;
}

const UnderlineButton: React.FC<UnderlineButtonProperties> = ({
  value = {},
  onChange,
  changeState,
  className,
  style = {},
  type
}) =>
  <Button
    style={style}
    type={type}
    onClick={e => onChange(underlineMarkStrategy(value.change()))}
    className={classnames(
      'slate-underline-plugin--button',
      { active: hasMark(value) },
      className
    )}
  >
    <FontAwesome name="underline" />
  </Button>
;

export default UnderlineButton
