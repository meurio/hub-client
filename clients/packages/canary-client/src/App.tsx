import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import {
  BondeSessionProvider as Session,
  BondeSessionUI as SessionUI,
  useSession
} from 'bonde-core-tools';
import {
  Loading,
  ToastContainer,
  ChakraProvider,
  chakraTheme,
  FontsLoader,
  CSSReset
} from 'bonde-components';
import { hotjar } from 'react-hotjar';
import { useTranslation } from 'react-i18next';
import { ScreenClassProvider } from 'react-grid-system';
// Scenes and Components to make your application
import CommunityPage from './scenes/Community';
import HomePage from './scenes/Home';
import SuperuserPage from './scenes/Superuser';
import WidgetsActionsPage from './scenes/WidgetActions';
import NotFound from './components/NotFound';
import LanguageTool from './LanguageTool';
import * as Flag from './Flag';
// import policies from './policies';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as types from "styled-components/cssprop";

import 'react-toastify/dist/ReactToastify.css'

type AppLoadingProps = {
  fetching: 'session' | 'user' | 'communities' | 'redirect' | 'module'
};

const AppLoading = ({ fetching }: AppLoadingProps) => {
  const { t } = useTranslation('loading');

  const messages = {
    session: t('session'),
    user: t('user'),
    communities: t('communities'),
    // TODO: change this implementation
    redirect: t('redirect'),
    module: t('module')
  };

  return <Loading fullsize message={messages[fetching]} />;
};

const RouteIsAdmin = (props: any) => {
  const { user } = useSession();

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

  React.useEffect(() => {
    hotjar.stateChange(pathname);
  }, [pathname])

  return (
    <ScreenClassProvider>
      <SessionUI
        indexRoute='/'
        disableNavigation={pathname === '/'}
        languageTool={ChangeLanguage}
      >
        <Switch>
          <Route exact path='/' component={HomePage} />
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
  // Extra config
  const config: any = {
    // Setup local cross-storage and staging api
    crossStorage: process.env.REACT_APP_DOMAIN_CROSS_STORAGE || 'http://bonde.devel:5003',
    apiGraphql: process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'http://api-graphql.bonde.devel/v1/graphql'
  };

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
            environment={envConfig}
            loading={AppLoading}
            extraConfig={config}
            // policies={policies}
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
