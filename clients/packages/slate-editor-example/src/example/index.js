import React from 'react'
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import { version } from '../../package.json'
import Home from './pages/Home'
import './index.css'

const history = createBrowserHistory()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line react/display-name
export default () => {
  return (
    <Router history={history}>
      <Home title='Nossas - SlateJS Editor' version={version} />
    </Router>
  );
}
