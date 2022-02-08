import { connect } from 'react-redux'
import Selectors from '../redux/selectors'
import { asyncMoveUp, asyncMoveDown, asyncUpdateBlock, handleEdit, asyncDestroyBlock } from '../redux/action-creators'
import BlockConfigMenu from './block-config-menu'

const mapStateToProps = (state, props) => {
  const selectors = Selectors(state, props)
  return {
    canMoveUp: selectors.canMoveUp(),
    canMoveDown: selectors.canMoveDown()
  }
}

const mapActionsToProps = (dispatch, props) => ({
  moveUp: block => dispatch(asyncMoveUp(block)),
  moveDown: block => dispatch(asyncMoveDown(block)),
  update: block => dispatch(asyncUpdateBlock(block)),
  onEdit: key => dispatch(handleEdit(key)),
  destroy: block => dispatch(asyncDestroyBlock(block))
})

export default connect(mapStateToProps, mapActionsToProps)(BlockConfigMenu)
