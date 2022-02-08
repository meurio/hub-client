import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import * as paths from 'paths'
import { Tabs, Tab } from 'components/navigation/tabs'
import { DivFloat, Button } from 'ux/components'

const PageHeader = ({ location }) => {
  const activePath = `${paths.mobilizations()}`
  const activePathWithBar = `${activePath}/`
  const archivedPath = `${activePath}?status=archived`
  const templatesPath = paths.mobilizationTemplatesList()

  const getPathnameWithQuery = () => {
    const { pathname, query } = location
    if (query && query.status) return `${pathname}?status=${query.status}`
    else return pathname
  }

  const pathnameWithQuery = getPathnameWithQuery()

  return (
    <div>
      <DivFloat>
        <Button to={paths.newMobilization()}>
          <i className='fa fa-plus mr2' style={{ fontSize: '.75rem' }} />
          <FormattedMessage
            id='mobilizations.components--page-header.button.text'
            defaultMessage='Nova mobilização'
          />
        </Button>
      </DivFloat>
      <Tabs>
        <Tab
          text={
            <FormattedMessage
              id='mobilizations.components--page-header.tabs.actives'
              defaultMessage='Ativas'
            />
          }
          path={activePath}
          isActive={(
            activePath === pathnameWithQuery ||
            activePathWithBar === pathnameWithQuery
          )}
        />
        <Tab
          text={
            <FormattedMessage
              id='mobilizations.components--page-header.tabs.archived'
              defaultMessage='Arquivadas'
            />
          }
          path={{ to: activePath, search: '?status=archived' }}
          isActive={archivedPath === pathnameWithQuery}
        />
        <Tab
          text={
            <FormattedMessage
              id='mobilizations.components--page-header.tabs.templates'
              defaultMessage='Templates'
            />
          }
          path={templatesPath}
          isActive={templatesPath === location.pathname}
        />
      </Tabs>
    </div>
  )
}

PageHeader.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
}

export default PageHeader
