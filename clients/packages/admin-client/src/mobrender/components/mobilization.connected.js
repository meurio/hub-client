import { connect } from 'react-redux'
import { asyncUpdateBlock } from '../redux/action-creators'
import { EDIT_KEY } from './block-config-menu'
import Selectors from '../redux/selectors'

import Mobilization from './mobilization'

const mapStateToProps = (state, props) => {
  const selectors = Selectors(state, props)
  const editing = selectors.getEditing()
  return {
    blockEditionMode: editing ? editing.indexOf(EDIT_KEY) !== -1 : false
  }
}

const mapActionsToProps = {
  blockUpdate: asyncUpdateBlock
}

export const mobrenderHOC = connect(mapStateToProps, mapActionsToProps)

export default connect(mapStateToProps, mapActionsToProps)(Mobilization)
