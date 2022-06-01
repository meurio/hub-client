import { GraphQLClient, gql } from 'graphql-request';
import * as t from '../action-types';
import { createAction } from './create-action';

// if (!process.env.REACT_APP_DOMAIN_API_GRAPHQL) throw new Error('REACT_APP_DOMAIN_API_GRAPHQL is empty');

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const INSERT_MOBILIZATION_QUERY = gql`
  mutation ($input: mobilizations_insert_input!) {
    insert_mobilizations_one(
      object: $input
    ) {
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
      theme {
        id
        label
      }
    }
  }
`;

interface Values extends Record<string, any> {
  subthemes?: number[]
}

export default ({ subthemes, ...values }: Values) => (dispatch): Promise<void> => {
  dispatch(createAction(t.ADD_MOBILIZATION_REQUEST));
  const input = values;
  if (subthemes && subthemes?.length > 0) {
    input.mobilizations_subthemes = {
      data: subthemes?.map((subtheme_id) => ({ subtheme_id }))
    }
  }

  return graphQLClient.request(INSERT_MOBILIZATION_QUERY, { input })
    .then((data) => {
      dispatch(createAction(t.ADD_MOBILIZATION_SUCCESS, data.insert_mobilizations_one));
      return data.insert_mobilizations_one;
    })
    .catch((err) => {
      if (err?.message?.startsWith('Uniqueness violation. duplicate key value violates unique constraint "index_mobilizations_on_slug"')) {
        const message = `Mobilização com nome "${values.name}" já existe!`;
        dispatch(createAction(t.ADD_MOBILIZATION_FAILURE, message));
        return Promise.reject({ name: message });
      } else {
        dispatch(createAction(t.ADD_MOBILIZATION_FAILURE, err));
        return Promise.reject({ _error: err });
      }
    });
}