import React from "react";
import { Route, Link, useLocation } from "react-router-dom";
import {
  Page,
  PageNavbar,
  PageContent,
  PageNavLink
} from "@bonde/components";
import Settings from "./Settings";
import Recipient from "./Recipient";
import Reports from "./Reports";

const CommunityRoute = () => {
  const { pathname } = useLocation();

  return (
    <Page>
      <PageNavbar
        header="Configurações"
        navigation={(
          <>
            <PageNavLink
              as={Link}
              active={pathname === "/community/reports"}
              to="/community/reports"
            >
              Dados
            </PageNavLink>
            <PageNavLink
              as={Link}
              active={pathname === "/community/settings"}
              to="/community/settings"
            >
              Informações
            </PageNavLink>
            <PageNavLink
              as={Link}
              active={pathname === "/community/recipient"}
              to="/community/recipient"
            >
              Recebimentos
            </PageNavLink>
          </>
        )}
      />
      <PageContent>
        <Route exact path="/community/reports" component={Reports} />
        <Route exact path="/community/settings" component={Settings} />
        <Route exact path="/community/recipient" component={Recipient} />
      </PageContent>
    </Page>
  );
}

export default CommunityRoute;