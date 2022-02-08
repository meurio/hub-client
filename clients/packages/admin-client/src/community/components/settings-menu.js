import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import urljoin from 'url-join'
import { Tabs, Tab } from 'components/navigation'
import { SettingsPageMenuLayout } from 'components/layout'
import * as CommunitySelectors from 'community/selectors'

import * as paths from 'paths'

export const SettingsMenu = ({ location: { pathname }, community }) => {
  const infoPath = paths.communityInfo()
  const mailchimpPath = paths.communityMailchimp()
  const twilioPath = paths.communityTwilio()
  const recipientPath = paths.communityRecipient()
  const reportPath = paths.communityReport()

  // Check domain page
  const domainPaths = [paths.communityDomain(), paths.communityDomainCreate()]
  const domainPageIsActive = domainPaths.indexOf(pathname) !== -1

  return (
    <SettingsPageMenuLayout
      title={
        <FormattedMessage
          id='community.components--settings-menu.title'
          defaultMessage='Configurações da comunidade'
        />
      }
    >
      <Tabs>
        <Tab
          isActive={infoPath === pathname}
          path={infoPath}
          text={
            <FormattedMessage
              id='community.components--settings-menu.tabs.info'
              defaultMessage='Informações'
            />
          }
        />
        <Tab
          onClick={() => {
            const url = urljoin(process.env.REACT_APP_DOMAIN_ADMIN_CANARY, `/community/mobilizers`)
            window.open(url, '_self')
          }}
          text={
            <FormattedMessage
              id='community.components--settings-menu.tabs.mobilizers'
              defaultMessage='Mobilizadores'
            />
          }
        />
        <Tab
          isActive={mailchimpPath === pathname}
          path={mailchimpPath}
          text={
            <FormattedMessage
              id='community.components--settings-menu.tabs.mailchimp'
              defaultMessage='Mailchimp'
            />
          }
        />
        <Tab
          isActive={twilioPath === pathname}
          path={twilioPath}
          text='Twilio'
        />
        <Tab
          isActive={recipientPath === pathname}
          path={recipientPath}
          text={
            <FormattedMessage
              id='community.components--settings-menu.tabs.recipient'
              defaultMessage='Recebedor'
            />
          }
        />
        <Tab
          isActive={reportPath === pathname}
          path={reportPath}
          text={
            <FormattedMessage
              id='community.components--settings-menu.tabs.metrics'
              defaultMessage='Métricas'
            />
          }
        />
        <Tab
          isActive={domainPageIsActive}
          path={paths.communityDomain()}
          text={
            <FormattedMessage
              id='community.components--settings-menu.tabs.domains'
              defaultMessage='Domínios'
            />
          }
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state) => ({
  community: CommunitySelectors.getCurrent(state)
})

export default connect(mapStateToProps)(SettingsMenu)
