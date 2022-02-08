import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import MobSelectors from '../redux/selectors'
import { asyncUpdateWidget as update } from '../redux/action-creators'
import Widget from './widget'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    saving: selectors.widgetsIsLoading(),
    mobilization: selectors.getMobilization() || selectors.getMobilizations()[0]
  }
}

const mapActionsToProps = { update }

export default connect(mapStateToProps, mapActionsToProps)(injectIntl(Widget))
