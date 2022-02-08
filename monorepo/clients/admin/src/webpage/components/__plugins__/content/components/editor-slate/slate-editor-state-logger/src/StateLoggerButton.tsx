import beautify from 'json-beautify'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'

const StateLoggerButton = ({ value, className, style, type }: any): React.ReactElement => {
  let empty: any[];
  return (
    <div>
      <Button
        className={className}
        style={style}
        type={type}
        onClick={e => {
          e.preventDefault()
          console.groupCollapsed('[State Logger]')
          console.info('State', beautify(value, empty, 2, 100))
          console.info('State Serialized', beautify(value.toJS(), empty, 2, 100))
          console.groupEnd()
        }}
      >
        <FontAwesome name='code' style={{ marginRight: 5 }} />
        State Logger
      </Button>
    </div>
  );
}

export default StateLoggerButton
