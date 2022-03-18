import React, { createContext, useContext, useState } from 'react';
import { gql, useQuery, useApolloClient, Context as SessionContext } from 'bonde-core-tools';
import * as CommunitySelectors from '../../community/selectors';
import { Loading } from '../../components/await';
import type { Mobilization, SidebarContextValues } from './types';

const toMobilization = (instance: any): Mobilization => ({
  id: instance.id,
  name: instance.name,
  slug: instance.slug,
  status: instance.status,
  goal: instance.goal,
  image: instance.facebook_share_image,
  created_at: instance.created_at,
  header_font: instance.header_font,
  body_font: instance.body_font
})

export const useUpdateCache = () => {
  const client = useApolloClient();
  const { community }: any = useContext(SessionContext);

  const update = (instance) => {
    // Update cache query mobilizations
    const variables = { community_id: community.id, status: 'active' };
    const mobilization = toMobilization(instance);

    const data = client.readQuery({ query: FETCH_SIDEBAR_QUERY, variables });
    
    client.writeQuery({
      query: FETCH_SIDEBAR_QUERY,
      variables,
      data: {
        mobilizations: [mobilization, ...data.mobilizations],
        dns_hosted_zones: data.dns_hosted_zones
      }
    });

    console.log("query updated");
  }

  return update;
}

// body_font: null
// color_scheme: "mobilizacoesnossas-scheme"
// community_id: 263
// created_at: "2022-03-17T17:48:23.750-03:00"
// custom_domain: null
// facebook_share_description: null
// facebook_share_image: null
// facebook_share_title: null
// favicon: null
// goal: "asdasdas"
// google_analytics_code: null
// header_font: null
// id: 6907
// language: "pt-BR"
// name: "Mobilização do IGOR"
// slug: "6750-mobilizacao-do-igor"
// status: "active"
// tag_list: []
// twitter_share_text: "Acabei de colaborar com Mobilização do IGOR. Participe você também: "
// updated_at: "2022-03-17T17:48:23.750-03:00"
// user_id: 152

const FETCH_SIDEBAR_QUERY = gql`
  query ($community_id: Int!, $status: status_mobilization!) {
    mobilizations(where: { community_id: { _eq: $community_id }, status: { _eq: $status } }, order_by: { updated_at: desc }) {
      id
      name
      slug
      status
      goal
      image: facebook_share_image
      facebook_share_description
      facebook_share_image
      facebook_share_title
      favicon
      google_analytics_code
      twitter_share_text
      language
      created_at
      header_font
      body_font
      custom_domain
      updated_at
      user_id
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
  changeStatus: (_status) => {},
  refetch: () => {}
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

  const mobilizations = data?.mobilizations || [];

  const sidebarValues = {
    fetching: loading,
    mobilizations,
    dnsHostedZones: data?.dns_hosted_zones || [],
    mobilization,
    refetch,
    changeStatus: (status: 'active' | 'archived') => {
      refetch({ community_id: CommunitySelectors.getCurrentId(), status: status });
    },
    selectMobilization: (id: number) => {
      const newMobilization = mobilizations.filter((m: Mobilization) => m.id === id)[0];
      setMobilization(newMobilization);
    }
  };

  return loading ? <Loading /> : (
    <SidebarContext.Provider value={sidebarValues}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;