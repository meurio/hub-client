import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import {
  Provider as Session,
  Context as SessionContext
} from 'bonde-core-tools';
import {
  Loading,
  ToastContainer,
  ChakraProvider,
  chakraTheme,
  FontsLoader,
  SessionUI,
  CSSReset
} from 'bonde-components';
import { hotjar } from 'react-hotjar';
import { useTranslation } from 'react-i18next';
import { ScreenClassProvider } from 'react-grid-system';
import { isMobile } from 'react-device-detect';
// Scenes and Components to make your application
import CommunityPage from './scenes/Community';
import HomePage from './scenes/Home';
import SuperuserPage from './scenes/Superuser';
import WidgetsActionsPage from './scenes/WidgetActions';
import NotFound from './components/NotFound';
import LanguageTool from './LanguageTool';
import * as Flag from './Flag';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as types from "styled-components/cssprop";

import 'react-toastify/dist/ReactToastify.css'

const RouteIsAdmin = (props: any) => {
  const { currentUser: user } = useContext(SessionContext);

  if (user.isAdmin) return <Route {...props} />;

  return <h2>Permission Denied</h2>;
};

const languages = [
  {
    locale: 'pt-BR',
    flag: Flag.Portuguese,
  },
  {
    locale: 'en',
    flag: Flag.English,
  },
  {
    locale: 'es',
    flag: Flag.Spanish,
  },
]

const ChangeLanguage = () => {
  const { i18n } = useTranslation('auth');
  const changeLanguage = (lng: 'en' | 'es' | 'pt-BR' | string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <LanguageTool>
      {languages.map(({ flag: Flag, locale }) => (
        <button
          key={`language-button-${locale}`}
          className={locale === i18n.language ? 'active' : undefined}
          onClick={() => changeLanguage(locale)}
          title={locale}
        >
          <Flag />
        </button>
      ))}
    </LanguageTool>
  );
}

const PageRouting = () => {
  const { pathname } = useLocation();
  const session = useContext(SessionContext);

  React.useEffect(() => {
    try {
      hotjar.stateChange(pathname);
    } catch(err) {
      console.log("hotjar", err);
    }
  }, [pathname])

  return (
    <ScreenClassProvider>
      <SessionUI
        indexRoute='/'
        disableNavigation={pathname === '/'}
        languageTool={ChangeLanguage}
        session={session}
        isMobile={isMobile}
      >
        <Switch>
          <Route
            exact
            path='/'
            component={HomePage}
          />
          <Route path='/community' component={CommunityPage} />
          <RouteIsAdmin path='/superuser' component={SuperuserPage} />
          <Route path='/widgets' component={WidgetsActionsPage} />
          <Redirect from='/admin' to='/' />
          <Route component={NotFound} />
        </Switch>
      </SessionUI>
    </ScreenClassProvider>
  );
}

type Environment = 'development' | 'staging' | 'production';

const App: React.FC = () => {
  // Environment to use for configure bonde-core-tools
  const envConfig: Environment =
    (process.env.REACT_APP_ENVIRONMENT || 'development') as Environment;

  console.info('Build environment:', envConfig);
  // App Urls
  const apiGraphqlUrl = process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'http://api-graphql.bonde.devel/v1/graphql';

  return (
    <React.Suspense fallback={Loading}>
      <>
        <FontsLoader />
        <ChakraProvider theme={chakraTheme}>
          <CSSReset />
          <ToastContainer
            className='BondeToastify'
            hideProgressBar={true}
          />
          <Session
            fetchData
            uri={apiGraphqlUrl}
            environment={envConfig}
            loadingComponent={
              <Loading fullsize message="Carregando sessão..." />
            }
          >
            <Router>
              <PageRouting />
            </Router>
          </Session>
        </ChakraProvider>
      </>
    </React.Suspense>
  );
}

export default App;
