import React, { useContext } from 'react';
import { useQuery, gql, Context as SessionContext } from 'bonde-core-tools';
import { DNSHostedZone } from './types';

const fetchGraphqlQuery = gql`
  query DNS ($communityId: Int!){
    dns_hosted_zones (where: { community_id: { _eq: $communityId }}) {
      id
      community {
        id
        name
      }
      comment
      domain_name
      ns_ok
      status
      hosted_zone_rest: response(path: "hosted_zone")
      hosted_zone: response(path: "HostedZone")
      name_servers_rest: response(path: "delegation_set.name_servers")
      name_servers: response(path: "DelegationSet.NameServers")

      certificates {
        is_active
      }

      dns_records {
        id
        name
        value
        record_type
        comment
        ttl
      }
    }
  }
`

const FetchDNSHostedZones: React.FC = ({ children }) => {
  const { community } = useContext(SessionContext);
  const { data, loading, error, refetch } = useQuery(
    fetchGraphqlQuery,
    { variables: { communityId: community?.id } }
  );

  if (loading) return 'Carregando DNS Hosted Zones';
  else if (error) return `Failed ${error}`;

  return (children as any)({
    refetch,
    dnsHostedZones: (data.dns_hosted_zones.map((dns: any) => ({
      ...dns,
      hosted_zone: dns.hosted_zone || dns.hosted_zone_rest,
      name_servers: dns.name_servers || dns.name_servers_rest
    })) as DNSHostedZone[])
  });
}

export default FetchDNSHostedZones;