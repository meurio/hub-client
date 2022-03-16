// import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// import MobSelectors from '../redux/selectors'
// import { asyncUpdateWidget as update } from '../redux/action-creators'
import React, { useContext } from 'react'
import Widget from './widget'
import { SidebarContext } from '../../pages/admin/sidebar/Provider'

// const mapStateToProps = (state, props) => {
//   const selectors = MobSelectors(state, props)
//   return {
//     saving: selectors.widgetsIsLoading(),
//     mobilization: selectors.getMobilization() || selectors.getMobilizations()[0]
//   }
// }

// const mapActionsToProps = { update }

// export default connect(mapStateToProps, mapActionsToProps)(injectIntl(Widget))

const WidgetConnected = (props) => {
  const { mobilization } = useContext(SidebarContext);

  return (
    <Widget
      {...props}
      saving={false}
      update={() => {
        console.log("TODO: update widget method")
      }}
      mobilization={mobilization}
    />
  );
}

export default injectIntl(WidgetConnected);

// TODO

// - Saving widget reducer
