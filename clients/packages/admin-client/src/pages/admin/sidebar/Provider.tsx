import React, { createContext, useState } from 'react';
import { gql, useQuery } from 'bonde-core-tools';
import * as CommunitySelectors from '../../../community/selectors';
import { Loading } from '../../../components/await';
import type { Mobilization, SidebarContextValues } from './types';

const FETCH_SIDEBAR_QUERY = gql`
  query ($community_id: Int!) {
    mobilizations(where: { community_id: { _eq: $community_id } }) {
      id
      name
      slug
    }

    dns_hosted_zones(where: { community_id: { _eq: $community_id }, ns_ok: { _eq: true } }) {
      domainName: domain_name
      hostedZone: response(path: "hosted_zone")
      delegationSet: response(path: "delegation_set")
      status
      ns_ok
    }
  }
`;

export const SidebarContext = createContext<SidebarContextValues>({
  mobilizations: [],
  dnsHostedZones: [],
  selectMobilization: (_id) => {}
})

const SidebarProvider: React.FC = ({ children }) => {
  const [mobilization, setMobilization] = useState();

  const { loading, data } = useQuery(FETCH_SIDEBAR_QUERY, {
    variables: { community_id: CommunitySelectors.getCurrentId() }
  });

  const sidebarValues = {
    mobilizations: data?.mobilizations || [],
    dnsHostedZones: data?.dns_hosted_zones || [],
    mobilization,
    selectMobilization: (id: number) => {
      setMobilization(
        (data?.mobilizations || []).filter((m: Mobilization) => m.id === id)[0]
      )
    }
  };

  return loading ? <Loading /> : (
    <SidebarContext.Provider value={sidebarValues}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;