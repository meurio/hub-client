import React, { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider, connect } from 'react-redux';
import {
  Provider as Session,
  Context as SessionContext,
} from 'bonde-core-tools';

import AppRouting from 'pages/app';

import * as t from 'community/action-types';

const Portal = ({ dispatch }) => {
  const { communities, community } = useContext(SessionContext);
  useEffect(() => {
    if ((communities || []).length > 0) {
      dispatch({ type: t.FETCH_SUCCESS, payload: communities });
    }
  }, [communities, dispatch]);

  useEffect(() => {
    if (!community) {
      const appDomain =
        process.env.REACT_APP_ENVIRONMENT === 'production'
          ? 'bonde.org'
          : process.env.REACT_APP_ENVIRONMENT === 'staging'
          ? 'staging.bonde.org'
          : 'bonde.devel';
      const protocol =
        process.env.REACT_APP_ENVIRONMENT !== 'development' ? 'https' : 'http';

      window.location.href = `${protocol}://admin-canary.${appDomain}`;
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

  return (
    <IntlProvider messages={messages} locale={locale}>
      <Provider store={store}>
        <Session
          uri={process.env.REACT_APP_DOMAIN_API_GRAPHQL}
          environment={envConfig}
          fetchData
        >
          <ConnectedPortal />
        </Session>
      </Provider>
    </IntlProvider>
  );
};

export default App;
