import "./ReactToastify.css";

import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { BondeSessionProvider, BondeSessionUI } from "bonde-core-tools";
import { Loading, Main, Body, ToastContainer } from "bonde-components";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as types from "styled-components/cssprop";

import {
  Relations,
  Individuals,
  Home,
  Match,
  Settings,
  GeolocationMatch,
} from "./pages";
import { Header, SelectMapaOrRedes } from "./components";
import { FilterProvider } from "./services/FilterProvider";
import { CommunityExtraProvider } from "./services/CommunityExtraProvider";

type SessionLoadingProps = {
  fetching: "session" | "user" | "communities" | "redirect" | "module";
};

const SessionLoading = ({ fetching }: SessionLoadingProps) => {
  const messages = {
    session: "Carregando sessão...",
    user: "Carregando usuário...",
    communities: "Carregando communidades...",
    redirect: "Redirecionando para autenticação...",
    module: "Redirecionando para módulo...",
  };

  return <Loading fullsize message={messages[fetching]} />;
};

type Environment = "development" | "staging" | "production";

const App = (): React.ReactElement => {
  const environment: string =
    process.env.REACT_APP_ENVIRONMENT || "development";
  const adminUrl =
    process.env.REACT_APP_DOMAIN_ADMIN_CANARY ||
    "http://bonde.devel:5001/admin";

  console.info("Build environment:", environment);
  // Extra config
  const config: any = {
    // Setup local cross-storage and staging api
    crossStorage:
      process.env.REACT_APP_DOMAIN_CROSS_STORAGE || "http://bonde.devel:5003",
    apiGraphql:
      process.env.REACT_APP_DOMAIN_API_GRAPHQL ||
      "http://api-graphql.bonde.devel/v1/graphql",
  };

  return (
    <BondeSessionProvider
      fetchData
      environment={environment as Environment}
      loading={SessionLoading}
      extraConfig={config}
    >
      <FilterProvider>
        <CommunityExtraProvider>
          <Router>
            <BondeSessionUI indexRoute={adminUrl}>
              <Main style={{ minWidth: "100%" }}>
                <Header />
                <ToastContainer
                  className="BondeToastify"
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
                    <SelectMapaOrRedes
                      path="/match/map"
                      exact
                      component={GeolocationMatch}
                    />
                    <SelectMapaOrRedes path="/match" component={Match} />
                    <SelectMapaOrRedes
                      path="/configuracoes"
                      component={Settings}
                    />
                  </Switch>
                </Body>
              </Main>
            </BondeSessionUI>
          </Router>
        </CommunityExtraProvider>
      </FilterProvider>
    </BondeSessionProvider>
  );
};

export default App;
