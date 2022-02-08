import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { hasMark, italicMarkStrategy } from './ItalicUtils'

interface ItalicButtonProperties {
  value?: any;
  onChange?: any;
  changeState?: any;
  className?: string;
  style?: any;
  type?: any;
}

const ItalicButton: React.FC<ItalicButtonProperties> = ({ value = {}, onChange, className, style = {}, type }) =>
  <Button
    style={style}
    type={type}
    onClick={e => onChange(italicMarkStrategy(value.change()))}
    className={classnames(
      'slate-italic-plugin--button',
      { active: hasMark(value) },
      className,
    )}
  >
    <FontAwesome name="italic" />
  </Button>
;

export default ItalicButton
