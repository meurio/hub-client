import React, { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider, connect } from 'react-redux';
import {
  Provider as Session,
  Context as SessionContext,
} from 'bonde-core-tools';

import AppRouting from '../pages/app';

import * as t from '../community/action-types';

const Portal = ({ dispatch }) => {
  const { communities, community } = useContext(SessionContext);
  useEffect(() => {
    if ((communities || []).length > 0) {
      dispatch({ type: t.FETCH_SUCCESS, payload: communities });
    }
  }, [communities, dispatch]);

  useEffect(() => {
    if (!community) {
      const envConfig = process.env.REACT_APP_ENVIRONMENT || 'development';
      console.info('Build environment:', envConfig);
    
      const protocol = envConfig === 'development' ? 'http' : 'https';
      const appDomain = process.env.REACT_APP_DOMAIN_PUBLIC || 'bonde.devel';

      window.location.href = process.env.REACT_APP_DOMAIN_ADMIN_CANARY || `${protocol}://admin-canary.${appDomain}`;
    }
  }, [community]);

  return <AppRouting />;
};

const ConnectedPortal = connect(undefined, (dispatch) => ({
  dispatch,
}))(Portal);

const App = ({ messages, locale, store }) => {
  // Environment to use for configure bonde-core-tools
  const envConfig = process.env.REACT_APP_ENVIRONMENT || 'development';
  console.info('Build environment:', envConfig);

  const protocol = envConfig === 'development' ? 'http' : 'https';
  const appDomain = process.env.REACT_APP_DOMAIN_PUBLIC || 'bonde.devel';

  const apiGraphQLUrl = process.env.REACT_APP_DOMAIN_API_GRAPHQL || `${protocol}://api-graphql.${appDomain}/v1/graphql`;

  return (
    <IntlProvider messages={messages} locale={locale}>
      <Provider store={store}>
        <Session
          fetchData
          protocol={protocol}
          apiGraphQLUrl={apiGraphQLUrl}
          appDomain={appDomain}
        >
          <ConnectedPortal />
        </Session>
      </Provider>
    </IntlProvider>
  );
};

export default App;
