import { GraphQLClient, gql } from 'graphql-request';
import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'

const DNS_HOSTED_ZONES_QUERY = gql`
  query ($community_id: Int!) {
    dns_hosted_zones(
      where: {
        community_id: { _eq: $community_id }
      }
    ) {
      id
      domain_name
      status
      ns_ok
      hosted_zone: response(path: "hosted_zone")
      delegation_set: response(path: "delegation_set")
      hosted_zone_new: response(path: "HostedZone")
      delegation_set_new: response(path: "DelegationSet")
      is_external_domain

      certificates {
        id
        domain
        is_active
        dns_hosted_zone_id
      }
    }
  }
`;

interface Certificate {
  id: number;
  domain: string;
  is_active: boolean;
}

interface HostedZoneFull {
  domain_name: string;
  status: string;
  ns_ok?: boolean;
  hosted_zone?: any;
  delegation_set?: any;
  certificates: Certificate[];
  is_external_domain?: boolean;
  // remove this field to return result
  hosted_zone_new?: any;
  delegation_set_new?: any;
}

interface DataResult {
  dns_hosted_zones: HostedZoneFull[];
}

type HostedZone = Omit<HostedZoneFull, 'hosted_zone_new' | 'delegation_set_new'>

// if (!process.env.REACT_APP_DOMAIN_API_GRAPHQL) throw new Error('REACT_APP_DOMAIN_API_GRAPHQL is empty');

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export default () => (dispatch, _getState: any): Promise<HostedZone[]> => {
  const community = CommunitySelectors.getCurrent();

  dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_REQUEST));
  return graphQLClient.request(
    DNS_HOSTED_ZONES_QUERY,
    { community_id: community.id }
  ).then((data: DataResult) => {
    const hostedZones: HostedZone[] = data.dns_hosted_zones.map((hostedZone) => {
      const { delegation_set_new, hosted_zone_new, ...instance } = hostedZone;
      return {
        ...instance,
        delegation_set: instance.delegation_set || delegation_set_new,
        hosted_zone: instance.hosted_zone || hosted_zone_new
      };
    });

    dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_SUCCESS, hostedZones));
    return Promise.resolve(hostedZones);
  }).catch((err) => {
    console.log('err', err);
    dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_FAILURE, err));
    return Promise.reject(err);
  });
}
