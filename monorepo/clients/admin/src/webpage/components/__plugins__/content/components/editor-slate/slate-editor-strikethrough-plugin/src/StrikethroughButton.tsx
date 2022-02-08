import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { hasMark, strikethroughMarkStrategy } from './StrikethroughUtils'

interface StrikethroughButtonProperties {
  value?: any;
  onChange?: any;
  changeState?: any;
  className?: string;
  style?: any;
  type?: any;
}

const StrikethroughButton: React.FC<StrikethroughButtonProperties> = ({
  value = {},
  onChange,
  className,
  style,
  type
}) =>
  <Button
    style={style}
    type={type}
    onClick={e => onChange(strikethroughMarkStrategy(value.change()))}
    className={classnames(
      'slate-strikethrough-plugin--button',
      { active: hasMark(value) },
      className,
    )}
  >
    <FontAwesome name="strikethrough" />
  </Button>
;

export default StrikethroughButton
