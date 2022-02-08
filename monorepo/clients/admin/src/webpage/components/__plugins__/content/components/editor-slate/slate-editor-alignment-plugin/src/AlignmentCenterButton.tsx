import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { alignmentMarkStrategy, getMark, hasMark } from './AlignmentUtils'



function AlignmentCenterButton({ value, onChange, changeState, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => onChange(alignmentMarkStrategy(value.change(), 'center'))}
    className={classnames(
      'slate-alignment-plugin--button',
      { active: hasMark(value) && getMark(value).data.get('align') === 'center' },
      className,
    )}
  >
    <FontAwesome name="align-center" />
  </Button>
}

export default AlignmentCenterButton
