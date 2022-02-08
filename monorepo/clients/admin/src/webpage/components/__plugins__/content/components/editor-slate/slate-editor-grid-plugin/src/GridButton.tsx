import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { appendGrid, hasGrid } from './GridUtils'



function GridButton({ value, onChange, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => onChange(appendGrid(value.change()))}
    className={classnames(
      'slate-grid-plugin--button',
      { active: hasGrid(value) },
      className,
    )}
  >
    <FontAwesome name="th" />
  </Button>
}

export default GridButton
