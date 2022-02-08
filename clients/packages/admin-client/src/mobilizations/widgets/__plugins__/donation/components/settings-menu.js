import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import * as paths from 'paths'
import { Tabs, Tab } from 'components/navigation/tabs'
import { SettingsPageMenuLayout } from 'components/layout'

const SettingsMenu = ({ mobilization, widget, location }) => {
  const donationPath = paths.donation(mobilization.id, widget.id) + '/settings'
  const donationAdjustmentsPath = paths.donation(mobilization.id, widget.id)
  const donationAutofirePath = paths.donationAutofire(mobilization.id, widget.id)
  const donationFinishPath = paths.donationFinish(mobilization.id, widget.id)

  return (
    <SettingsPageMenuLayout
      title={
        <FormattedMessage
          id='donation.components--settings-menu.title'
          defaultMessage='Configure sua caixa de doação'
        />
      }
    >
      <Tabs>
        <Tab
          path={donationAdjustmentsPath}
          isActive={donationAdjustmentsPath === location.pathname}
          text={
            <FormattedMessage
              id='donation.components--settings-menu.tabs.adjusts'
              defaultMessage='Ajustes'
            />
          }
        />
        <Tab
          path={donationPath}
          isActive={donationPath === location.pathname}
          text={
            <FormattedMessage
              id='donation.components--settings-menu.tabs.info'
              defaultMessage='Dados para doação'
            />
          }
        />
        <Tab
          path={donationAutofirePath}
          isActive={donationAutofirePath === location.pathname}
          text={
            <FormattedMessage
              id='donation.components--settings-menu.tabs.autofire'
              defaultMessage='Mensagem agradecimento'
            />
          }
        />
        <Tab
          path={donationFinishPath}
          isActive={donationFinishPath === location.pathname}
          text={
            <FormattedMessage
              id='donation.components--settings-menu.tabs.post-action'
              defaultMessage='Pós-doação'
            />
          }
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  mobilization: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  widget: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
}

export default SettingsMenu
