import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { Context as SessionContext } from 'bonde-core-tools';

import * as paths from 'paths'
import * as mobilizationUtils from 'mobilizations/utils'
import { Loading } from 'components/await'
import { Sidenav, SidenavList, SidenavListItem } from 'components/navigation/sidenav'

const WrappedSidebar = (props) => {
  const { logout } = useContext(SessionContext);

  return (
    <Sidebar {...props} logout={logout} />
  )
}

const Sidebar = ({ children, loading, mobilization, user, community, logout }) => loading ? <Loading /> : (
  <div className='top-0 right-0 bottom-0 left-0 flex flex-column absolute'>
    <Sidenav community={community}>
      {!mobilization ? (
        <SidenavList className='bg-lighten-2'>
          <SidenavListItem
            text={
              <FormattedMessage
                id='components.navigation--sidebar.community-settings.item.mobilizations'
                defaultMessage='Mobilizações'
              />
            }
            icon='list'
            href={paths.mobilizations()}
          />
          <SidenavListItem
            text={
              <FormattedMessage
                id='components.navigation--sidebar.community-settings.item.info'
                defaultMessage='Comunidade'
              />
            }
            icon='info-circle'
            href={paths.communityInfo()}
          />
          <SidenavListItem
            text={
              <FormattedMessage
                id='components.navigation--sidebar.community-settings.item.metrics'
                defaultMessage='Métricas'
              />
            }
            icon='line-chart'
            href={paths.communityReport()}
          />
          <SidenavListItem
            text={
              <FormattedMessage
                id='components.navigation--sidebar.community-settings.item.domains'
                defaultMessage='Domínios'
              />
            }
            icon='cogs'
            href={paths.communityDomain()}
          />
        </SidenavList>
      ) : (
        <SidenavList className='bg-lighten-2'>
          {!mobilizationUtils.isLaunched(mobilization) ? (
            <SidenavListItem
              text={
                <FormattedMessage
                  id='components.navigation--sidebar.mobilization-settings.item.launch'
                  defaultMessage='PUBLICAR BONDE'
                />
              }
              icon='rocket'
              href={paths.mobilizationLaunch(mobilization.id)}
              className='launch-button rounded'
            />
          ) : (
            <SidenavListItem
              text={
                <FormattedMessage
                  id='components.navigation--sidebar.mobilization-settings.item.launched'
                  defaultMessage='BONDE público'
                />
              }
              icon='check'
              className='launched-item'
              href='/#'
            />
          )}
          <SidenavListItem
            text={
              <FormattedMessage
                id='components.navigation--sidebar.mobilization-settings.item.edit'
                defaultMessage='Editar mobilização'
              />
            }
            icon='pencil'
            href={paths.editMobilization(mobilization.id)}
          />
          <SidenavListItem
            text={
              <FormattedMessage
                id='components.navigation--sidebar.mobilization-settings.item.add-block'
                defaultMessage='Adicionar conteúdo'
              />
            }
            icon='plus'
            href={paths.createBlock({ id: mobilization.id })}
          />
          <SidenavListItem
            text={
              <FormattedMessage
                id='components.navigation--sidebar.mobilization-settings.item.open-at-new-tab'
                defaultMessage='Ver em uma nova aba'
              />
            }
            icon='external-link'
            linkType='anchor'
            href={paths.mobilization(mobilization)}
            target='_blank'
          />
          <SidenavListItem
            text={
              <FormattedMessage
                id='components.navigation--sidebar.mobilization-settings.item.config'
                defaultMessage='Configurações'
              />
            }
            icon='cog'
            href={paths.basicsMobilization(mobilization.id)}
          />
        </SidenavList>
      )}
      <SidenavList style={{ position: 'absolute', bottom: 0 }}>
        <SidenavListItem
          text={
            <FormattedMessage
              id='components.navigation--sidebar.footer.account'
              defaultMessage='Minha Conta'
            />
          }
          icon='user'
          href={paths.editAccount()}
        >
          <div className='white h6'>{user.email}</div>
        </SidenavListItem>
        <SidenavListItem
          text={
            <FormattedMessage
              id='components.navigation--sidebar.footer.sign-out'
              defaultMessage='Sair'
            />
          }
          icon='sign-out'
          className='caps'
          linkType='anchor'
          href='#'
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        />
      </SidenavList>
    </Sidenav>
    <div className='flex flex-auto' style={{ marginLeft: 80 }}>
      {children}
    </div>
  </div>
)

WrappedSidebar.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  mobilization: PropTypes.object
}

export default WrappedSidebar
