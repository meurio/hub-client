import "./ReactToastify.css";

import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider as Session, Context as SessionContext } from "bonde-core-tools";
import {
  ToastContainer,
  Main,
  Body,
  ChakraProvider,
  chakraTheme,
  FontsLoader,
  CSSReset,
  SessionUI
} from 'bonde-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as types from "styled-components/cssprop";

import { Relations, Individuals, Home, Match, Settings } from "./pages";
import { Header, SelectMapaOrRedes } from "./components";
import { FilterProvider } from "./services/FilterProvider";
import { CommunityExtraProvider } from "./services/CommunityExtraProvider";

type Environment = "development" | "staging" | "production";

const AppRouter = ({ adminUrl }) => {
  const session: any = useContext(SessionContext);

  return (
    <Router>
      <SessionUI indexRoute={adminUrl} session={session}>
        <Main style={{ minWidth: "100%" }}>
          <Header />
          <ToastContainer
            className='BondeToastify'
            hideProgressBar={true}
          />
          <Body style={{ paddingTop: "20px", display: "unset" }}>
            <Switch>
              <SelectMapaOrRedes exact path="/" component={Home} />
              <SelectMapaOrRedes path="/matches" component={Relations} />
              <SelectMapaOrRedes
                path="/pessoas"
                component={Individuals}
              />
              <SelectMapaOrRedes path="/match" component={Match} />
              <SelectMapaOrRedes
                path="/configuracoes"
                component={Settings}
              />
            </Switch>
          </Body>
        </Main>
      </SessionUI>
    </Router>
  );
}

const App = (): React.ReactElement => {
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
    <ChakraProvider theme={chakraTheme}>
      <CSSReset />
      <FontsLoader />
      <Session
        fetchData
        apiGraphQLUrl={apiGraphQLUrl}
        appDomain={appDomain}
      >
        <FilterProvider>
          <CommunityExtraProvider>
            <AppRouter adminUrl={appUrl} />
          </CommunityExtraProvider>
        </FilterProvider>
      </Session>
    </ChakraProvider>
  );
};

export default App;
