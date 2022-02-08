import React from 'react'
import { Switch } from 'react-router-dom'

// Routes
import BetaBotPage from './bot'
import CommunityCreatePage from './communities/create'
import SidebarContainer from './sidebar'
import PrivateRoute from './private-route'

const Logged = () => {
  return (
    <Switch>
      <PrivateRoute
        exact
        path='/bot'
        component={BetaBotPage}
      />
      <PrivateRoute
        exact
        path='/communities/new'
        component={CommunityCreatePage}
      />
      <PrivateRoute
        path='/'
        component={SidebarContainer}
      />
    </Switch>
  );
}

export default Logged;
