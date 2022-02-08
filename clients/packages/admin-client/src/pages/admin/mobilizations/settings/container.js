import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { SettingsPageLayout, SettingsPageContentLayout } from 'components/layout'
import { SettingsMenu } from 'mobilizations/components'
import MobSelectors from 'mobrender/redux/selectors'
import { selectMobilization } from 'mobrender/redux/action-creators'

// Pages
import MobilizationsAnalytics from './analytics'
import MobilizationsBasics from './basics'
import MobilizationsCustomDomain from './domain'
import MobilizationsMetrics from './metrics'
import MobilizationsSharing from './sharing'

class MobilizationsSettings extends React.Component {
  componentDidMount () {
    const { match: { params }, hasCurrentMobilization, selectMobilization } = this.props

    !hasCurrentMobilization && selectMobilization(params.mobilization_id)
  }

  render () {
    const { location, mobilization, match: { path } } = this.props
    return (
      <SettingsPageLayout>
        <SettingsMenu location={location} mobilization={mobilization} />
        <SettingsPageContentLayout>
          <Route exact path={`${path}/analytics`} component={MobilizationsAnalytics} />
          <Route exact path={`${path}/basics`} component={MobilizationsBasics} />
          <Route exact path={`${path}/customDomain`} component={MobilizationsCustomDomain} />
          <Route exact path={`${path}/metrics`} component={MobilizationsMetrics} />
          <Route exact path={`${path}/sharing`} component={MobilizationsSharing} />
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

const mapStateToProps = (state, props) => {
  const selector = MobSelectors(state, props)

  return {
    hasCurrentMobilization: selector.hasCurrentMobilization(),
    mobilization: selector.getMobilization() || {}
  }
}

const mapDispatchToProps = { selectMobilization }

export default connect(mapStateToProps, mapDispatchToProps)(MobilizationsSettings)
