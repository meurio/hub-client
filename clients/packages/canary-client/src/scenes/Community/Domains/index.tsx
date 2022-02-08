import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FetchDNSHostedZones from './FetchDNSHostedZones';
import DetailDomain from './DetailDomain';
import ListDomain from './ListDomain';

const Domains: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <FetchDNSHostedZones>
      {({ dnsHostedZones, refetch }: any) => (
        <Switch>
          <Route exact path={path}>
            <ListDomain dnsHostedZones={dnsHostedZones} refetch={refetch} />
          </Route>
          <Route exact path={`${path}/:hostedZoneId`}>
            <DetailDomain dnsHostedZones={dnsHostedZones} refetch={refetch} />
          </Route>
        </Switch>
      )}
    </FetchDNSHostedZones>
  );
}

export default Domains;