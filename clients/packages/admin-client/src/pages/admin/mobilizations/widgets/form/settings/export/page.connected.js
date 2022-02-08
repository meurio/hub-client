//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/form/export
//
import { connect } from 'react-redux'
import { asyncWidgetDataExport, dataExportMount } from 'mobrender/redux/action-creators'
import MobSelectors from 'mobrender/redux/selectors'

import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)

  return {
    loading: state.mobilizations.dataExport.loading,
    error: state.mobilizations.dataExport.error,
    success: state.mobilizations.dataExport.success,
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

const mapActionsToProps = {
  asyncWidgetDataExport,
  dataExportMount
}

export default connect(mapStateToProps, mapActionsToProps)(Page)
