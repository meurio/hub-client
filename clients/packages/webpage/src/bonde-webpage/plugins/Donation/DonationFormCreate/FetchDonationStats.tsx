import React, { useState, useEffect } from 'react';
// import gql from 'graphql-tag';
import DonationStats from './DonationStats';

// const query = gql`
//   query fetchDonationGoalStats($widgetId: Int!) {
//     stats: getWidgetDonationStats(widgetId: $widgetId)
//   }
// `;

type Props = {
  // Function created with createApolloFetch
  // https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
  asyncFetchDonationsStats: any;
  widgetId: number;
  mainColor: string;
  goalDateLimit?: string;
};

const FetchDonationStats = ({
  asyncFetchDonationsStats,
  widgetId,
  mainColor,
  goalDateLimit,
}: Props) => {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    asyncFetchDonationsStats({ widget_id: widgetId })
      .then(({ data }: any) => {
        setData(data.stats);
        setFetching(false);
      })
      .catch((err: any) => {
        console.error('FetchDonationStats: ', err);
      });
  }, [asyncFetchDonationsStats, widgetId]);

  if (fetching) return <div />;
  else
    return (
      <DonationStats
        data={data}
        goalDateLimit={goalDateLimit}
        mainColor={mainColor}
      />
    );
};

export default FetchDonationStats;
