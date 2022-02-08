import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as paths from 'paths'
import EmptyList from 'components/empty-list'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from 'components/layout'
import { PageHeader } from 'mobilizations/components'
import List from 'mobilizations/components/list'
import {
  Item,
  Avatar,
  Name,
  CreatedAt,
  More,
  MoreMenu,
  MoreMenuAction,
  CopyNumber
} from 'mobilizations/components/list/items'

class TemplatesListPage extends React.Component {
  componentDidMount () {
    const { loaded, asyncFetch, toggleMenu, community } = this.props

    !loaded && asyncFetch(community)
    toggleMenu(undefined)
  }

  render () {
    const {
      menuActiveIndex,
      mobilizationTemplates,
      location,
      intl,
      // Actions
      toggleMenu,
      asyncDestroyTemplate
    } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout
          title={
            <FormattedMessage
              id='page--templates-list.header.title'
              defaultMessage='Seus templates'
            />
          }
        >
          <PageHeader location={location} />
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout containerClassName='lg-col-12'>
          {!mobilizationTemplates.length ? (
            <EmptyList>
              <FormattedMessage
                id='page--templates-list.empty-list.no-template'
                defaultMessage='Nenhum template criado.'
              />
              <br />
              <FormattedMessage
                id='page--templates-list.empty-list.create-one'
                defaultMessage='Crie a partir de uma mobilização.'
              />
              <br />
              <Link
                className='bg-pagenta btn caps h3 rounded white py2 px3 mt3'
                to={paths.mobilizations()}
              >
                <FormattedMessage
                  id='page--templates-list.empty-list.mobilization-list'
                  defaultMessage='Lista de mobilizações'
                />
              </Link>
            </EmptyList>
          ) : (
            <List>
              <Item.Header>
                <Name.Header />
                <CreatedAt.Header />
                <CopyNumber.Header />
              </Item.Header>

              {mobilizationTemplates && mobilizationTemplates.map((template, index) => (
                <Item
                  key={`mobilization-${template.id}`}
                  className={classnames({ 'z2': menuActiveIndex === index })}
                >
                  <div className='gay20'>
                    <Avatar {...template} />

                    <div className='list-item-table-container overflow-hidden'>
                      <Name {...template} />
                      <CreatedAt {...template} />
                      <CopyNumber {...template} />
                    </div>
                  </div>
                  <More onClick={() => toggleMenu(index)} index={index}>
                    <MoreMenu active={menuActiveIndex === index}>
                      <MoreMenuAction
                        componentClass='div'
                        text={
                          <FormattedMessage
                            id='page--templates-list.more-menu-action.remove.text'
                            defaultMessage='Remover'
                          />
                        }
                        icon='trash-o'
                        onClick={() => {
                          const confirmMessage = intl.formatMessage({
                            id: 'page--templates-list.more-menu-action.remove.confirm',
                            defaultMessage:
                              'Tem certeza que deseja remover este template? ' +
                              'Ao confirmar, não será possível desfazer esta ação.'
                          })
                          if (window.confirm(confirmMessage)) {
                            asyncDestroyTemplate(template)
                              .then(() => {
                                toggleMenu(index)
                              })
                          }
                        }}
                      />
                    </MoreMenu>
                  </More>
                </Item>
              ))}
            </List>
          )}
        </SettingsPageContentLayout>
        {menuActiveIndex && (
          <div
            className='mobilization-list-more-menu-cancel-overlay z1'
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
            onClick={() => toggleMenu(undefined)}
          />
        )}
      </SettingsPageLayout>
    )
  }
}

TemplatesListPage.propTypes = {
  menuActiveIndex: PropTypes.number,
  mobilizationTemplates: PropTypes.array,
  asyncDestroyTemplate: PropTypes.func,
  toggleMenu: PropTypes.func
}

export default TemplatesListPage
