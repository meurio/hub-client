import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import {
  Provider as Session
} from "bonde-core-tools";
import {
  Loading,
  ChakraProvider,
  chakraTheme,
  FontsLoader,
  CSSReset
} from 'bonde-components';
// Scenes and Components to make your application
import BaseLayout from './components/BaseLayout';
import LoginPage from './scenes/LoginPage';
import RegisterPage from './scenes/RegisterPage';
import ForgetPasswordPage from './scenes/ForgetPasswordPage';
import ResetPasswordPage from './scenes/ResetPasswordPage';

type Environment = "development" | "staging" | "production";

const App: React.FC = () => {
  // Environment to use for configure bonde-core-tools
  const envConfig: Environment =
    (process.env.REACT_APP_ENVIRONMENT || "development") as Environment;

  console.info('Build environment:', envConfig);
  // App URL
  const protocol = envConfig === 'development' ? 'http' : 'https';
  const appDomain = process.env.REACT_APP_DOMAIN_PUBLIC || 'bonde.devel';

  const apiGraphQLUrl = process.env.REACT_APP_DOMAIN_API_GRAPHQL || `${protocol}://api-graphql.${appDomain}/v1/graphql`;
  const appUrl = process.env.REACT_APP_DOMAIN_ADMIN_CANARY || `${protocol}://admin-canary.${appDomain}`;

  return (
    <React.Suspense fallback={Loading}>
      <>
        <FontsLoader />
        <ChakraProvider theme={chakraTheme}>
          <CSSReset />
          <Session apiGraphQLUrl={apiGraphQLUrl} appDomain={appDomain}>
            <Router>
              <Switch>
                <BaseLayout>
                  <Route exact path='/'>
                    <Redirect to='/login' />
                  </Route>
                  <Route exact path='/login'>
                    <LoginPage to={appUrl} />
                  </Route>
                  <Route exact path='/register'>
                    <RegisterPage to={appUrl} />
                  </Route>
                  <Route exact path='/forget-password'>
                    <ForgetPasswordPage />
                  </Route>
                  <Route exact path='/reset-password'>
                    <ResetPasswordPage />
                  </Route>
                </BaseLayout>
              </Switch>
            </Router>
          </Session>
        </ChakraProvider>
      </>
    </React.Suspense>
  );
}

export default App;
