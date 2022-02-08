import { EDIT_KEY } from './block-config-menu'
import { useAppState } from '../../Application';
import Selectors from '../../selectors';
import { asyncUpdateBlock } from '../../async-actions';
import Mobilization from './mobilization'

export default (properties: any): React.ReactElement => {
  const { state, dispatch } = useAppState();
  const selectors = Selectors(state);
  const editing = selectors.getEditing();
  
  const mobilizationProperties: any = {
    mobilization: selectors.getMobilization() || selectors.getMobilizations()[0],
    blocks: selectors.getBlocks(),
    blocksIsLoaded: selectors.blocksIsLoaded(),
    widgets: selectors.getWidgets(),
    blockEditionMode: editing ? editing.includes(EDIT_KEY) : false,
    blockUpdate: asyncUpdateBlock(dispatch)
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Mobilization {...properties} {...mobilizationProperties} />
}
