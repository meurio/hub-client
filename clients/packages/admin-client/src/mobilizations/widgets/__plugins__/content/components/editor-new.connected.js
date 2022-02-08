import { connect } from 'react-redux'
import EditorNew from './editor-new'
import { handleEdit, handleCancelEdit } from 'mobrender/redux/action-creators'

const mapActionsToProps = {
  onEdit: () => handleEdit('widget'),
  onCancelEdit: () => handleCancelEdit('widget')
}

export default connect(undefined, mapActionsToProps)(EditorNew)
