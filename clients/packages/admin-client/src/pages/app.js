import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { TechnicalIssues } from '../components/error/index';
import { ZendeskWidget } from '../components/external-services';
import { GoogleFontsLoader } from '../components/fonts';
import LoggedRoute from './admin';

import '../styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

const AuthExample = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" component={LoggedRoute} />
        <Route component={TechnicalIssues} />
      </Switch>
    </Router>
    <ZendeskWidget />
    <ToastContainer />
    <GoogleFontsLoader fonts="Source Sans Pro" />
  </div>
);

export default AuthExample;
