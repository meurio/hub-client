import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import * as paths from 'paths'
import { Tabs, Tab } from 'components/navigation/tabs'
import { SettingsPageMenuLayout } from 'components/layout'

const SettingsMenu = ({ mobilization, location }) => {
  const basicsMobilizationPath = paths.basicsMobilization(mobilization.id)
  const sharingMobilizationPath = paths.sharingMobilization(mobilization.id)
  const analyticsMobilizationPath = paths.analyticsMobilization(mobilization.id)
  const metricsMobilizationPath = paths.metricsMobilization(mobilization.id)
  const customDomainMobilizationPath = paths.customDomainMobilization(mobilization.id)

  return (
    <SettingsPageMenuLayout
      title={
        <FormattedMessage
          id='mobilizations.components--settings-menu.title'
          defaultMessage='Configure sua mobilização'
        />
      }
    >
      <Tabs>
        <Tab
          text={
            <FormattedMessage
              id='mobilizations.components--settings-menu.tabs.info'
              defaultMessage='Informações básicas'
            />
          }
          path={basicsMobilizationPath}
          isActive={basicsMobilizationPath === location.pathname}
        />
        <Tab
          text={
            <FormattedMessage
              id='mobilizations.components--settings-menu.tabs.sharing'
              defaultMessage='Compartilhamento'
            />
          }
          path={sharingMobilizationPath}
          isActive={sharingMobilizationPath === location.pathname}
        />
        <Tab
          text='Google Analytics'
          path={analyticsMobilizationPath}
          isActive={analyticsMobilizationPath === location.pathname}
        />
        <Tab
          text={
            <FormattedMessage
              id='mobilizations.components--settings-menu.tabs.metrics'
              defaultMessage='Métricas'
            />
          }
          path={metricsMobilizationPath}
          isActive={metricsMobilizationPath === location.pathname}
        />
        <Tab
          text={
            <FormattedMessage
              id='mobilizations.components--settings-menu.tabs.domain'
              defaultMessage='Domínio'
            />
          }
          path={customDomainMobilizationPath}
          isActive={customDomainMobilizationPath === location.pathname}
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  mobilization: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default SettingsMenu
