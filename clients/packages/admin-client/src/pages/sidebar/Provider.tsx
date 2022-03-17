import React, { createContext, useState } from 'react';
import { gql, useQuery } from 'bonde-core-tools';
import * as CommunitySelectors from '../../community/selectors';
import { Loading } from '../../components/await';
import type { Mobilization, SidebarContextValues } from './types';

const FETCH_SIDEBAR_QUERY = gql`
  query ($community_id: Int!, $status: status_mobilization!) {
    mobilizations(where: { community_id: { _eq: $community_id }, status: { _eq: $status } }, order_by: { updated_at: desc }) {
      id
      name
      slug
      status
      goal
      image: facebook_share_image
      createdAt: created_at
      header_font
      body_font
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
  fetching: true,
  mobilizations: [],
  dnsHostedZones: [],
  selectMobilization: (_id) => {},
  changeStatus: (_status) => {}
})

const SidebarProvider: React.FC = ({ children }) => {
  const [mobilization, setMobilization] = useState();
  // Fetch Sidebar mobilizations and dns_hosted_zones
  const { loading, data, refetch } = useQuery(FETCH_SIDEBAR_QUERY, {
    variables: {
      community_id: CommunitySelectors.getCurrentId(),
      status: "active"
    }
  });

  const sidebarValues = {
    fetching: loading,
    mobilizations: data?.mobilizations || [],
    dnsHostedZones: data?.dns_hosted_zones || [],
    mobilization,
    changeStatus: (status: 'active' | 'archived') => {
      refetch({ community_id: CommunitySelectors.getCurrentId(), status: status });
    },
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