import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { appendEmbed, hasEmbed } from './EmbedUtils'

interface EmbedButtonProperties {
  value?: any;
  onChange?: any;
  changeState?: any;
  className?: string;
  style?: any;
  type?: string;
}

const EmbedButton: React.FC<EmbedButtonProperties> = ({ value = {}, onChange, changeState, className, style, type }) =>
  <Button
    style={style}
    type={type}
    onClick={e => {
      const embed = window.prompt('Enter the embed that you want to add.')
      if (embed) {
        onChange(appendEmbed(value.change(), embed))
      }
    }}
    className={classnames(
      'slate-embed-plugin--button',
      { active: hasEmbed(value) },
      className
    )}
  >
    <FontAwesome name="code" />
  </Button>
;

export default EmbedButton
