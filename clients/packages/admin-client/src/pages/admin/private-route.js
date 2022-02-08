import React, { useContext } from 'react'
import { Route, Redirect as RedirectComponent } from 'react-router-dom'
import { Context as SessionContext } from 'bonde-core-tools';
import * as paths from 'paths'
import { Loading } from 'components/await'

const Redirect = ({ pathname, location }) => (
  <RedirectComponent to={{ pathname, state: { from: location } }} />
)

const PrivateRoute = ({
  component: Component,
  exact = false,
  path,
  ...rest
}) => {
  const { currentUser: user, community } = useContext(SessionContext);
  const authenticated = !!user;
  const hasCommunity = !!community;

  return (
    <Route
      {...rest}
      exact={exact}
      path={path}
      render={props => {
        const { location: { pathname } } = rest

        const isRoot = pathname === '/'
        const isCommunity = pathname.match(/\/communities\/?/)
        const isMobilizations = pathname.match(/\/mobilizations\/?/)

        const mobilizationsPath = paths.mobilizations()
        const communitiesPath = paths.communityList()
        const loginPath = paths.login()

        const redir = destination => ({
          [mobilizationsPath]: authenticated && hasCommunity && isRoot && !isMobilizations,
          [communitiesPath]: authenticated && !hasCommunity && !isCommunity,
          [loginPath]: !authenticated
        }[destination])

        if (redir(mobilizationsPath)) {
          return <Redirect {...props} pathname={mobilizationsPath} />
        } else if (redir(communitiesPath)) {
          window.location.href = process.env.REACT_APP_DOMAIN_ADMIN_CANARY
            || 'https://admin-canary.staging.bonde.org';
          return <Loading />
        } else if (redir(loginPath)) {
          return <Redirect {...props} pathname={loginPath} />
        } else {
          return <Component {...props} />
        }
      }}
    />
  );
}

// const mapStateToProps = state => ({
//   authenticated: AccountSelectors(state).getCredentials(),
//   hasCommunity: !!CommunitySelectors.getCurrent(state)
// })

export default PrivateRoute;
