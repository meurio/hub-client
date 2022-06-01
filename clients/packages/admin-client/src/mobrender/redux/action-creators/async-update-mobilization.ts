import { GraphQLClient, gql } from 'graphql-request';
import { createAction } from './create-action'
import * as t from '../action-types'
import asyncFetchBlocks from './async-fetch-blocks'
import asyncFetchWidgets from './async-fetch-widgets'

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const UPDATE_MOBILIZATION_QUERY = gql`
  mutation ($id: Int!, $input: mobilizations_set_input, $subthemes: [mobilizations_subthemes_insert_input!]!) {
    insert_mobilizations_subthemes(objects: $subthemes) {
      returning {
        subtheme_id
        mobilization_id
      }
    }
    
    update_mobilizations_by_pk(
      pk_columns: { id: $id },
      _set: $input
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
  id: number;
  fieldName?: string
}

export default ({ fieldName, id, subthemes, ...values }: Values) => (dispatch): Promise<any> => {
  dispatch(createAction(t.UPDATE_MOBILIZATION_REQUEST));

  return graphQLClient.request(UPDATE_MOBILIZATION_QUERY, {
    id,
    input: values,
    subthemes: subthemes?.map((subtheme_id) => ({ mobilization_id: id, subtheme_id }))
  })
  .then((data) => {
    dispatch(createAction(t.UPDATE_MOBILIZATION_SUCCESS, data.update_mobilizations_by_pk));
    
    if (values.template_mobilization_id) {
      dispatch(asyncFetchBlocks(data.update_mobilizations_by_pk.id));
      dispatch(asyncFetchWidgets(data.update_mobilizations_by_pk.id));
    }

    return data.update_mobilizations_by_pk;
  })
  .catch((err) => {
    if (err?.message?.startsWith('Uniqueness violation. duplicate key value violates unique constraint "index_mobilizations_on_slug"')) {
      const message = `Slug deve ser único e "${values.slug}" já existe!`;
      dispatch(createAction(t.UPDATE_MOBILIZATION_FAILURE, message));
      return Promise.reject({ slug: message });
    } else {
      dispatch(createAction(t.UPDATE_MOBILIZATION_FAILURE, err));
      return Promise.reject({ _error: err });
    }
  });
}