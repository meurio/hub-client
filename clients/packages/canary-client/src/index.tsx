import * as React from "react";
import ReactDOM from "react-dom";
import { setConfiguration } from 'react-grid-system';
import { hotjar } from 'react-hotjar';

import "./i18n";
import App from "./App";

import * as serviceWorker from "./serviceWorker";

setConfiguration({ maxScreenClass: 'xl' });

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

if (process.env.REACT_APP_HOTJAR_ID && process.env.REACT_APP_HOTJAR_SV) {
  hotjar.initialize(parseInt(process.env.REACT_APP_HOTJAR_ID), parseInt(process.env.REACT_APP_HOTJAR_SV));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
