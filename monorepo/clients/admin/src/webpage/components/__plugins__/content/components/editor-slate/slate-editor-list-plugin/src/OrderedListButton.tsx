import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { isOrderedList, orderedListStrategy } from './ListUtils'



const OrderedListButton: React.FC<any> = ({ value, onChange, className, style, type }) =>
  <Button
    style={style}
    type={type}
    onClick={e => onChange(orderedListStrategy(value.change()))}
    className={classnames(
      'slate-list-plugin--button',
      { active: isOrderedList(value) },
      className,
    )}
  >
    <FontAwesome name="list-ol" />
  </Button>
;

export default OrderedListButton
