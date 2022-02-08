import 'react-app-polyfill/ie9';
import * as React from "react";
import ReactDOM from "react-dom";
// import "./i18n";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
// import React from 'react'
// import { render } from 'react-dom'
import {
  IntlProvider,
  addLocaleData
} from 'react-intl'
import pt from 'react-intl/locale-data/pt'
import es from 'react-intl/locale-data/es'
import en from 'react-intl/locale-data/en'
import Raven from 'raven-js'
import localeData from 'intl/locale-data'
// import Application from './app'
import { configureStore } from './store'

const __PROD__ = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
const __TEST__ = process.env.NODE_ENV === 'test'

if (__PROD__ || __TEST__) {
  Raven.config(process.env.REACT_APP_SENTRY_DSN_PUBLIC).install()
}

// Set up React-Intl
addLocaleData([...pt, ...es, ...en])
const defaultLocale = 'pt-BR'
const { languages, language } = window.navigator
const currentLocale = ((languages && languages[0]) || language) || defaultLocale
const languageWithoutRegionCode = currentLocale.toLowerCase().split(/[_-]+/)[0]
const locale = currentLocale
const messages = (
  localeData[currentLocale] ||
  localeData[languageWithoutRegionCode] ||
  localeData[defaultLocale]
)
const intlProvider = new IntlProvider({ locale, messages })
const { intl } = intlProvider.getChildContext()

const initialState = window.INITIAL_STATE || {
  intl: { currentLocale, messages: localeData }
}

// Set up Redux store
export const store = configureStore(initialState, { intl })

ReactDOM.render(
  <React.StrictMode>
    <App store={store} messages={messages} locale={locale} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
