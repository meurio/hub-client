import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'

import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from 'components/layout'
import * as paths from 'paths'
import List from 'mobilizations/components/list'
import {
  Item,
  Avatar,
  Name,
  CreatedAt,
  Users,
  FundRaising,
  More,
  MoreMenu,
  MoreMenuAction
} from 'mobilizations/components/list/items'
import { PageHeader } from 'mobilizations/components'

export class MobilizationsListPage extends Component {
  componentWillMount () {
    this.props.select(undefined)
    this.props.toggleMenu(undefined)
  }

  handleSelectItem (mobilization) {
    this.props.select(mobilization.id)
    this.props.history.push(paths.editMobilization(mobilization.id))
  }

  render () {
    const { location, mobilizations, menuActiveIndex } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title={
          <FormattedMessage
            id='page--mobilizations-list.page-header.title'
            defaultMessage='Suas Mobilizações'
          />
        }
      >
          <PageHeader location={location} />
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout containerClassName='lg-col-12'>
          <List>
            <Item.Header>
              <Name.Header />
              <CreatedAt.Header />
              <Users.Header />
              <FundRaising.Header />
            </Item.Header>

            {mobilizations && mobilizations.map((mobilization, index) => (
              <Item
                key={`item-${mobilization.id}`}
                className={classnames({ 'z2': menuActiveIndex === index })}
              >
                <div className='gray20' onClick={() => this.handleSelectItem(mobilization)}>
                  <Avatar {...mobilization} />

                  <div className='list-item-table-container overflow-hidden'>
                    <Name {...mobilization} />
                    <CreatedAt {...mobilization} />
                    <Users {...mobilization} />
                    <FundRaising {...mobilization} />
                  </div>
                </div>

                <More onClick={() => this.props.toggleMenu(index)} index={index}>
                  <MoreMenu active={menuActiveIndex === index}>
                    <MoreMenuAction
                      componentClass='a'
                      target='_blank'
                      text={
                        <FormattedMessage
                          id='page--mobilizations-list.more-menu-action.open'
                          defaultMessage='Abrir página'
                        />
                      }
                      path={paths.mobilization(mobilization)}
                      icon='external-link'
                    />
                    <MoreMenuAction
                      text={
                        <FormattedMessage
                          id='page--mobilizations-list.more-menu-action.create-template'
                          defaultMessage='Criar template'
                        />
                      }
                      path={paths.mobilizationTemplatesCreate(mobilization)}
                      icon='star'
                    />
                    <MoreMenuAction
                      componentClass='div'
                      text={
                        (mobilization.status === 'active' ? (
                          <FormattedMessage
                            id='page--mobilizations-list.more-menu-action.archived'
                            defaultMessage='Arquivar'
                          />
                        ) : (
                          <FormattedMessage
                            id='page--mobilizations-list.more-menu-action.active'
                            defaultMessage='Ativar'
                          />
                        ))
                      }
                      onClick={() => {
                        this.props.changeStatus(mobilization)
                          .then(() => {
                            this.props.toggleMenu(undefined)
                          })
                      }}
                      icon='archive'
                    />
                  </MoreMenu>
                </More>
              </Item>
            ))}
          </List>
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

MobilizationsListPage.propTypes = {
  mobilizations: PropTypes.array.isRequired,
  menuActiveIndex: PropTypes.number,
  select: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  // Injected by react-router
  location: PropTypes.object.isRequired
}

export default MobilizationsListPage
