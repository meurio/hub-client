import PropTypes from 'prop-types'
import React from 'react'

import {
  SettingsPageLayout,
  SettingsPageContentLayout
} from 'components/layout'

if (require('exenv').canUseDOM) require('./page.scss')

const PageCentralizedLayout = ({ children }) => {
  return (
    <SettingsPageLayout className='page-centralized-layout'>
      <SettingsPageContentLayout
        className='table col-12 full-height center'
        wrapClassName='table-cell align-middle'
      >
        {children}
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

PageCentralizedLayout.propTypes = {
  children: PropTypes.node
}

export default PageCentralizedLayout
