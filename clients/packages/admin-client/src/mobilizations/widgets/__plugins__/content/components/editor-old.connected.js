import { connect } from 'react-redux'
import EditorOld from './editor-old'
import MobSelectors from 'mobrender/redux/selectors'
import { handleEdit, handleCancelEdit } from 'mobrender/redux/action-creators'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    mobilization: selectors.getMobilization()
  }
}

const mapActionsToProps = (dispatch, ownProps) => ({
  onEdit: () => dispatch(handleEdit('widget')),
  onCancelEdit: () => dispatch(handleCancelEdit('widget')),
  ...ownProps
})

export default connect(mapStateToProps, mapActionsToProps)(EditorOld)
