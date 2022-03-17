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
import Sidebar from './sidebar';
import MobilizationsScene from './mobilizations';
import TemplatesScene from './templates';

import '../styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
      <Router>
        <Sidebar>
          <Switch>
            <Route path="/templates" component={TemplatesScene} />
            <Route path="/" component={MobilizationsScene} />
            <Route component={TechnicalIssues} />
          </Switch>
        </Sidebar>
      </Router>
    <ZendeskWidget />
    <ToastContainer />
    <GoogleFontsLoader fonts="Source Sans Pro" />
  </>
);

export default App;
