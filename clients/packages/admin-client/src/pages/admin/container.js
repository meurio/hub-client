import React from 'react'
import { Switch } from 'react-router-dom'

// Routes
import BetaBotPage from './bot'
import Sidebar from './sidebar'
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
        path='/'
        component={Sidebar}
      />
    </Switch>
  );
}

export default Logged;
