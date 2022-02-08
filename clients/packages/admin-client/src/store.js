import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import axios from 'axios';
import createReducer from './createReducer';

const logoutOnCanary = () => {
  const domain = process.env.REACT_APP_LOGIN_URL || 'http://bonde.devel:5000';
  window.location.href = `${domain}?next=${window.location.href}`;
};

const api = axios.create({
  baseURL:
    process.env.REACT_APP_DOMAIN_API_REST || 'http://api-rest.bonde.devel',
});

const middlewares = [promise];

export function configureStore(initialState, thunkExtraArgument) {
  middlewares.push(
    thunk.withExtraArgument({
      axios,
      api,
      ...thunkExtraArgument,
    })
  );

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.asyncReducers = {};

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    ({ response, ...error }) => {
      if (response && response.status === 401) {
        logoutOnCanary();
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ response, ...error });
    }
  );

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () =>
        store.replaceReducer(require('./createReducer').default)
      );
    }
  }

  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
