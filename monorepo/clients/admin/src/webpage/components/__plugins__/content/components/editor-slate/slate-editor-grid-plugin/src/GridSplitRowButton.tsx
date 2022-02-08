import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { splitRow } from './GridUtils'



function GridSplitRowButton({ value, onChange, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => onChange(splitRow(value.change()))}
    className={classnames('slate-grid-plugin--button', className)}
  >
    <FontAwesome name='level-down' />
  </Button>
}

export default GridSplitRowButton
