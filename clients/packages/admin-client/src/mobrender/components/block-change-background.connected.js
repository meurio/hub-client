import { connect } from 'react-redux'
import Selectors from '../redux/selectors'
import { asyncUpdateBlock, handleChangeBackground, handleCancelEdit, handleUploadFile } from '../redux/action-creators'

import BlockChangeBackground, { BLOCK_UPLOAD_KEY } from './block-change-background'

const mapStateToProps = (state, props) => ({
  progress: Selectors(state, props).getUploadProgress(BLOCK_UPLOAD_KEY),
  mobilization: Selectors(state, props).getMobilization()
})

const mapActionsToProps = {
  update: asyncUpdateBlock,
  onChangeBackground: handleChangeBackground,
  onCancelEdit: handleCancelEdit,
  onUploadFile: handleUploadFile
}

export default connect(mapStateToProps, mapActionsToProps)(BlockChangeBackground)
