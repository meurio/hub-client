import gql from 'graphql-tag';

import type { Filter, WidgetGraphQL } from './types';
import { client as GraphQLAPI } from '.';

const asyncFilterWidgetGraphql = async ({ slug, custom_domain }: any) => {

  const filter: Filter = {};
  if (slug) filter.slug = { _eq: slug };
  if (custom_domain) filter.custom_domain = { _eq: custom_domain };

  return GraphQLAPI.query({
    query: gql`
      query ($filter: mobilizations_bool_exp!) {
        widgets(where: { block: { mobilization: $filter } }, order_by: { id: asc }) {
          id
          kind
          goal
          settings
          block_id
          created_at
          updated_at
          sm_size
          md_size
          lg_size

          activist_pressures_aggregate {
            aggregate {
              count
            }
          }

          form_entries_aggregate {
            aggregate {
              count
            }
          }

          donations_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `,
    variables: { filter },
    fetchPolicy: ("REACT_APP_ACTIVE_API_CACHE" in process.env && process.env.REACT_APP_ACTIVE_API_CACHE === "true" ? "cache-first" : "network-only"),
  })
    .then(({ data }: { data: { widgets: WidgetGraphQL[] } }) => {
      return Promise.resolve({
        widgets: data.widgets.map((w: WidgetGraphQL) => ({
          ...w,
          form_entries_count: w.form_entries_aggregate.aggregate.count,
          donations_count: w.donations_aggregate.aggregate.count,
          count: w.activist_pressures_aggregate.aggregate.count
        }))
      })
    })
    .catch((err: any) => {
      console.log('failed', err);
      return Promise.reject(err);
    })
}

export default asyncFilterWidgetGraphql;