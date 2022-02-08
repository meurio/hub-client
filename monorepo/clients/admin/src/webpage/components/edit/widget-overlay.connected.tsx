import { useAppState } from '../../Application';
import WidgetOverlay from './widget-overlay'
import Selectors from '../../selectors';
import { handleMouseOver, handleMouseOut } from '../../actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state, dispatch } = useAppState();
  const selectors = Selectors(state, properties);

  const overlayProperties = {
    // eslint-disable-next-line react/destructuring-assignment
    hasMouseOver: selectors.hasMouseOver('widget', properties.widget.id),
    onMouseOver: handleMouseOver(dispatch),
    onMouseOut: handleMouseOut(dispatch)
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <WidgetOverlay {...properties} {...overlayProperties} />
}
