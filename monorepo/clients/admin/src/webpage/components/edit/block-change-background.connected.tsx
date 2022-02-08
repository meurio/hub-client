import { useAppState } from '../../Application'
import Selectors from '../../selectors'
import { handleCancelEdit, handleUploadFile, handleChangeBackground } from "../../actions";
import { asyncUpdateBlock } from "../../async-actions";

import BlockChangeBackground, { BLOCK_UPLOAD_KEY } from './block-change-background'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state, dispatch } = useAppState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeBackgroundProperties: any = {
    progress: Selectors(state, properties).getUploadProgress(BLOCK_UPLOAD_KEY),
    mobilization: Selectors(state, properties).getMobilization(),
    update: asyncUpdateBlock(dispatch),
    onChangeBackground: handleChangeBackground(dispatch),
    onCancelEdit: handleCancelEdit(dispatch),
    onUploadFile: handleUploadFile(dispatch)
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BlockChangeBackground {...properties} {...changeBackgroundProperties} />;
}
