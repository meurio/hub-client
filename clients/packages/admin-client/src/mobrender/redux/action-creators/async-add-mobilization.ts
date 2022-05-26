import { GraphQLClient, gql } from 'graphql-request';
import * as t from '../action-types';
import { createAction } from './create-action';

// if (!process.env.REACT_APP_DOMAIN_API_GRAPHQL) throw new Error('REACT_APP_DOMAIN_API_GRAPHQL is empty');

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const INSERT_MOBILIZATION_QUERY = gql`
  mutation ($input: mobilizations_insert_input!) {
    insert_mobilizations_one(object: $input) {
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
    }
  }
`;

export default (values: any) => (dispatch): Promise<void> => {
  dispatch(createAction(t.ADD_MOBILIZATION_REQUEST));
  return graphQLClient.request(INSERT_MOBILIZATION_QUERY, { input: values })
    .then((data) => {
      dispatch(createAction(t.ADD_MOBILIZATION_SUCCESS, data.insert_mobilizations_one));
      return data.insert_mobilizations_one;
    })
    .catch((err) => {
      dispatch(createAction(t.ADD_MOBILIZATION_FAILURE, err));
      // return Promise.reject(err);
    });
}