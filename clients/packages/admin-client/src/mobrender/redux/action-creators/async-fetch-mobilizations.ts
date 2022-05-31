import { GraphQLClient, gql } from 'graphql-request';
import * as t from '../action-types'
import { createAction } from './create-action'

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const FETCH_MOBILIZATIONS_QUERY = gql`
  query ($where: mobilizations_bool_exp) {
    mobilizations(where: $where) {
      id
      body_font
      color_scheme
      created_at
      custom_domain
      deleted_at
      facebook_share_description
      facebook_share_image
      facebook_share_title
      favicon
      goal
      google_analytics_code
      header_font
      language
      name
      slug
      status
      twitter_share_text
      updated_at
      user_id
      community {
        id
        name
      }
      mobilizations_subthemes {
        subtheme {
          id
          label
        }
      }
      theme_id
      theme {
        id
        label
      }
    }
  }
`;

export default (communityId?: number) => (dispatch): Promise<any[] | Error> => {
  dispatch(createAction(t.FETCH_MOBILIZATIONS_REQUEST));

  return graphQLClient.request(FETCH_MOBILIZATIONS_QUERY, communityId
    ? { where: { community_id: { _eq: communityId } } }
    : undefined
    )
    .then((data) => {
      dispatch(createAction(t.FETCH_MOBILIZATIONS_SUCCESS, data.mobilizations));
      return Promise.resolve(data.mobilizations);
    })
    .catch((err) => {
      dispatch(createAction(t.FETCH_MOBILIZATIONS_FAILURE, err));
    });
}