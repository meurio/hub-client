import React, { useState, useEffect } from 'react';
// import gql from 'graphql-tag';
// import DonationStats from './DonationStats';

// const query = gql`
//   query Targets($widgetId: Int!) {
//     pressure_targets(
//       where: { widget_id: { _eq: $widgetId } }
//       order_by: { label: asc }
//     ) {
//       identify
//       label
//       targets
//       email_subject
//       email_body
//     }
//   }
// `;

type Props = {
  // Function created with createApolloFetch
  // https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
  asyncFetchTargets: any;
  widgetId: number;
  children: any;
};

interface State {
  data: any[];
  fetching: boolean;
}

const FetchTargets = ({ asyncFetchTargets, widgetId, children }: Props) => {
  const [state, setState] = useState<State>({ data: [], fetching: true });

  useEffect(() => {
    asyncFetchTargets({ widget_id: widgetId })
      .then(({ data }: any) => {
        setState({ data: data?.pressure_targets, fetching: false });
      })
      .catch((err: any) => {
        console.error('FetchTargets: ', err);
      });
  }, []);

  // TODO: Render Loading...
  if (state.fetching) return <div />;
  return children({ data: state.data });
};

export default FetchTargets;
