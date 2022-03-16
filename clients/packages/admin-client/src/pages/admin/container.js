import React from 'react'
import { Switch } from 'react-router-dom'

// Routes
import Sidebar from './sidebar'
import PrivateRoute from './private-route'

const Logged = () => {
  return (
    <Switch>
      <PrivateRoute
        path='/'
        component={Sidebar}
      />
    </Switch>
  );
}

export default Logged;
