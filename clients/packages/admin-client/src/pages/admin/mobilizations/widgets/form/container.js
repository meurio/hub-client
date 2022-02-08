import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import MobSelectors from 'mobrender/redux/selectors'
import { SettingsPageLayout, SettingsPageContentLayout } from 'components/layout'
import { SettingsMenu } from 'mobilizations/widgets/__plugins__/form/components'

// Pages
import Adjustments from './settings/adjustments'
import Autofire from './settings/autofire'
import Export from './settings/export'
import Fields from './settings/fields'
import Finish from './settings/finish'

class WidgetsForm extends React.Component {
  render () {
    const { match: { path }, mobilization, widget, location } = this.props

    return (
      <SettingsPageLayout className='atomic'>
        <SettingsMenu mobilization={mobilization} widget={widget} location={location} />
        <SettingsPageContentLayout>
          <Route exact path={`${path}`} component={Adjustments} />
          <Route exact path={`${path}/autofire`} component={Autofire} />
          <Route exact path={`${path}/export`} component={Export} />
          <Route exact path={`${path}/fields`} component={Fields} />
          <Route exact path={`${path}/finish`} component={Finish} />
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

export default connect(mapStateToProps)(WidgetsForm)
