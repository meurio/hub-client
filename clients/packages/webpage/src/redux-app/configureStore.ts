import axios from 'axios';
import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import apiClient from './apiClient';
import createReducer, { sourceReqCreateReducer } from './createReducer';
import { intl as intlClient } from './intlReducer';

const middlewares = [
  promise,
  thunk.withExtraArgument({
    intl: intlClient,
    api: apiClient,
    axios,
  }),
];

const makeStore = (context: any) => createStore(createReducer({
  sourceRequest: sourceReqCreateReducer({
    host: context.req?.headers.host || '',
    protocol:  context.req?.headers['x-forwarded-proto'] || 'http'
  })
}),
{},
compose(
  applyMiddleware(...middlewares)
));

export const wrapper = createWrapper<Store<any>>(makeStore, {debug: true});
