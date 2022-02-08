import { connect } from 'react-redux'
import { selectors } from 'bonde-webpage/lib/redux'

const mapStateToProps = (state, props) => {
  const query = selectors(state, props)
  return {
    mobilization: query.getMobilization() || query.getMobilizations()[0],
    blocks: query.getBlocks(),
    blocksIsLoaded: query.blocksIsLoaded(),
    widgets: query.getWidgets()
  }
}

export default connect(mapStateToProps)
