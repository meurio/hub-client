import gql from 'graphql-tag';

import type { Filter, MobilizationGraphQL } from './types';
import { client as GraphQLAPI } from '.';

const asyncFilterMobilizationsGraphql = async ({ slug, custom_domain }: any) => {

  const filter: Filter = {};
  if (slug) filter.slug = { _eq: slug };
  if (custom_domain) filter.custom_domain = { _eq: custom_domain };

  return GraphQLAPI.query({
    query: gql`
      query ($filter: mobilizations_bool_exp!) {
        mobilizations(where: $filter) {
          id
          name
          created_at
          color_scheme
          google_analytics_code
          goal
          header_font
          body_font
          facebook_share_title
          facebook_share_description
          facebook_share_image
          slug
          custom_domain
          twitter_share_text
          community_id
          language
          community {
            image
            name
            signature
          }
          favicon
          status
        }
      }
    `,
    variables: { filter },
    fetchPolicy: ("REACT_APP_ACTIVE_API_CACHE" in process.env && process.env.REACT_APP_ACTIVE_API_CACHE === "true" ? "cache-first" : "network-only"),
  })
    .then(({ data }: { data: { mobilizations: MobilizationGraphQL[] } }) => {
      return Promise.resolve({ mobilizations: data.mobilizations });
    })
    .catch((err: any) => {
      console.log('failed', err);
      return Promise.reject(err);
    })
}

export default asyncFilterMobilizationsGraphql;