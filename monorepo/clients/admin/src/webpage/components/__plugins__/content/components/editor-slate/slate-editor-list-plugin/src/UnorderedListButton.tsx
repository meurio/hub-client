import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { isUnorderedList, unorderedListStrategy } from './ListUtils'



function UnorderedListButton({ value, onChange, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => onChange(unorderedListStrategy(value.change()))}
    className={classnames(
      'slate-list-plugin--button',
      { active: isUnorderedList(value) },
      className,
    )}
  >
    <FontAwesome name="list-ul" />
  </Button>
}

export default UnorderedListButton
