import React from 'react'
import { FormattedMessage } from 'react-intl'

import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from 'components/layout'
import * as paths from 'paths'
import { Tabs, Tab } from 'components/navigation/tabs'

const PageTabLayout = ({ children, location }) => {
  const goalIsActive = location && location.pathname === paths.newMobilization()
  const templateIsActive = location && /\/\w+\/[0-9]+\/templates\/choose/.test(location.pathname)

  return (
    <SettingsPageLayout>
      <SettingsPageMenuLayout
        title={
          <FormattedMessage
            id='mobilizations.components--page-tab-layout.title'
            defaultMessage='Nova mobilização'
          />
        }
      >
        <Tabs>
          <Tab
            text={
              <FormattedMessage
                id='mobilizations.components--page-tab-layout.tabs.goal'
                defaultMessage='Objetivo'
              />
            }
            isActive={goalIsActive}
            index={1}
          />
          <Tab
            text={
              <FormattedMessage
                id='mobilizations.components--page-tab-layout.tabs.templates'
                defaultMessage='Templates'
              />
            }
            isActive={templateIsActive}
            index={2}
          />
        </Tabs>
      </SettingsPageMenuLayout>
      <SettingsPageContentLayout wrapClassName='md-col-12 lg-col-6 mx-auto'>
        {children}
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default PageTabLayout
