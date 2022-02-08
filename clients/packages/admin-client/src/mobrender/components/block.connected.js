import { connect } from 'react-redux'
import Selectors from '../redux/selectors'
import { handleMouseOver, handleMouseOut, handleCancelEdit } from '../redux/action-creators'
import Block, { HOVER_MOUSE_KEY } from './block'

const mapStateToProps = (state, props) => {
  const selectors = Selectors(state)
  return {
    editing: selectors.getEditing(),
    saving: selectors.getBlockSaving(),
    hasMouseOver: selectors.hasMouseOver(HOVER_MOUSE_KEY, props.block.id)
  }
}

const mapActionsToProps = {
  onMouseOver: handleMouseOver,
  onMouseOut: handleMouseOut,
  onCancelEdit: handleCancelEdit
}

export default connect(mapStateToProps, mapActionsToProps)(Block)
