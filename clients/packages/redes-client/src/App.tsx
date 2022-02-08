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

const AppRouter = () => {
  const session: any = useContext(SessionContext);
  const adminUrl =
    process.env.REACT_APP_DOMAIN_ADMIN_CANARY || "https://admin-canary.staging.bonde.org";

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
  const environment: string =
    process.env.REACT_APP_ENVIRONMENT || "development";

  console.info('Build environment:', environment);

  const apiGraphqlUrl = process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'http://api-graphql.bonde.devel/v1/graphql';

  return (
    <ChakraProvider theme={chakraTheme}>
      <CSSReset />
      <FontsLoader />
      <Session
        fetchData
        uri={apiGraphqlUrl}
        environment={environment as Environment}
      >
        <FilterProvider>
          <CommunityExtraProvider>
            <AppRouter />
          </CommunityExtraProvider>
        </FilterProvider>
      </Session>
    </ChakraProvider>
  );
};

export default App;
