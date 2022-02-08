import { connect } from 'react-redux'
import WidgetOverlay from './widget-overlay'
import Selectors from '../redux/selectors'
import {
  handleMouseOver as onMouseOver,
  handleMouseOut as onMouseOut
} from '../redux/action-creators'

const mapStateToProps = (state, props) => {
  const selectors = Selectors(state, props)
  return {
    hasMouseOver: selectors.hasMouseOver('widget', props.widget.id)
  }
}

const mapActionsToProps = { onMouseOver, onMouseOut }

export default connect(mapStateToProps, mapActionsToProps)(WidgetOverlay)
