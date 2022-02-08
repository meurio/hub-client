import type { State } from '../reducers';
import { gql } from "graphql-request";
import apiGraphql from './api-graphql';
import * as t from "../action-types";

const FETCH_MOBILIZATIONS = gql`
  query {
    mobilizations {
      id
      name
      slug
      status
      traefik_backend_address
      traefik_host_rule
      twitter_share_text
      updated_at
      user_id
      language
      header_font
      google_analytics_code
      goal
      favicon
      facebook_share_title
      facebook_share_image
      facebook_share_description
      deleted_at
      custom_domain
      created_at
      community_id
      color_scheme
      body_font
    }
  }
`;

const fetchMobilizations = (_state: State, dispatch) => (): void => {
  dispatch({ type: t.FETCH_MOBILIZATIONS_REQUEST });
  apiGraphql.request(FETCH_MOBILIZATIONS)
    .then((data) => {
      dispatch({ type: t.FETCH_MOBILIZATIONS_SUCCESS, payload: data.mobilizations });
    })
    .catch((error) => {
      dispatch({ type: t.FETCH_MOBILIZATIONS_FAILURE, payload: error });
    })
}

export default fetchMobilizations;