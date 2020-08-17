import React from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import { BondeSessionProvider as Session, BondeSessionUI as SessionUI } from "bonde-core-tools";
import { Loading } from "bonde-components";
import { useTranslation } from "react-i18next";
// Scenes and Components to make your application
import HomePage from './scenes/Home';
// import SessionRedirect from './components/SessionRedirect';
// import TextLoading from './components/TextLoading';
// import LoginPage from './scenes/LoginPage';
// import RegisterPage from './scenes/RegisterPage';
// import ForgetPasswordPage from './scenes/ForgetPasswordPage';
// import ResetPasswordPage from './scenes/ResetPasswordPage';

type AppLoadingProps = {
  fetching: "session" | "user" | "communities" | "redirect" | "module"
};

const AppLoading = ({ fetching }: AppLoadingProps) => {
  const { t } = useTranslation("loading");

  const messages = {
    session: t("session"),
    user: t("user"),
    communities: t("communities"),
    // TODO: change this implementation
    redirect: t("redirect"),
    module: t("module"),
  };

  return <Loading fullsize message={messages[fetching]} />;
};

const PageRouting = () => {
  const { pathname } = useLocation();

  return (
    <SessionUI indexRoute='/' disableNavigation={pathname === '/'}>
      <Route exact path='/'>
        <HomePage />
      </Route>
    </SessionUI>
  );
}

type Environment = "development" | "staging" | "production";

function App() {
  // Environment to use for configure bonde-core-tools
  const envConfig: Environment =
    (process.env.REACT_APP_ENVIRONMENT || "development") as Environment;
  
  console.info('Build environment:', envConfig);
  // Extra config
  const config: any = {
    // Setup local cross-storage and staging api
    crossStorage: process.env.REACT_APP_DOMAIN_CROSS_STORAGE || 'http://cross-storage.bonde.devel',
    apiGraphql: process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'https://api-graphql.staging.bonde.org/v1/graphql'
  };

  return (
    <React.Suspense fallback={Loading}>
      <Session fetchData environment={envConfig} loading={AppLoading} extraConfig={config}>
        <Router>
          <PageRouting />
          {/* <SessionRedirect loading={TextLoading} paths={['/auth/login']} to={appUrl}>
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
          </SessionRedirect> */}
        </Router>
      </Session>
    </React.Suspense>
  );
}

export default App;
