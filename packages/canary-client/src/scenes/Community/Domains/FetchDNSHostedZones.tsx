import { useQuery, gql, useSession } from 'bonde-core-tools';

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

const FetchDNSHostedZones = ({ children }: any) => {
  const { community } = useSession();
  const { data, loading, error } = useQuery(
    fetchGraphqlQuery,
    { variables: { communityId: community?.id } }
  );

  if (loading) return 'Carregando DNS Hosted Zones';
  else if (error) return `Failed ${error}`;

  return children({
    dnsHostedZones: data.dns_hosted_zones.map((dns: any) => ({
      ...dns,
      hosted_zone: dns.hosted_zone || dns.hosted_zone_rest,
      name_servers: dns.name_servers || dns.name_servers_rest
    }))
  });
}

export default FetchDNSHostedZones;