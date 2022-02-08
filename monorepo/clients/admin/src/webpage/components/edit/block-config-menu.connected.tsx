import { useAppState } from '../../Application';
import Selectors from '../../selectors';
import { handleEdit } from '../../actions';
import { asyncMoveUp, asyncMoveDown, asyncUpdateBlock, asyncDestroyBlock } from '../../async-actions';
import BlockConfigMenu from './block-config-menu'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state, dispatch } = useAppState();
  const selectors = Selectors(state, properties);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const configMenuProperites: any = {
    canMoveUp: selectors.canMoveUp(),
    canMoveDown: selectors.canMoveDown(),
    moveUp: asyncMoveUp(dispatch, state),
    moveDown: asyncMoveDown(dispatch, state),
    update: asyncUpdateBlock(dispatch),
    onEdit: handleEdit(dispatch),
    destroy: asyncDestroyBlock(dispatch)
  }
  
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BlockConfigMenu {...properties} {...configMenuProperites} />;
}
