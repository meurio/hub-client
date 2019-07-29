import React from 'react'
import { I18n } from 'react-i18next'
import { Auth } from 'services/auth'
import MenuCommunity from './MenuCommunity'

export default (props) => (
  <I18n ns='header'>
    {(t) => (
      <Auth>
        {({ user, logout }) => (
          <MenuCommunity
            t={t}
            user={user}
            logout={logout}
            {...props}
          />
        )}
      </Auth>
    )}
  </I18n>
)
