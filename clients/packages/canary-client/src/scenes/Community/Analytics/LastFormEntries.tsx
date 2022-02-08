import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalActivistsFormEntryQuery = gql`
  query (
    $community_id: Int!,
    $start_interval: timestamp!,
    $end_interval: timestamp!
  ) {
    totalUniqActivistsByKindAndCommunityInterval: participations_aggregate(
      where: {
        _and: [
          { community_id: { _eq: $community_id } },
          { participate_at: { _gte: $start_interval } },
          { participate_at: { _lte: $end_interval } },
          { participate_kind: { _eq: "form_entries" } }
        ]
      },
      distinct_on: activist_id
    ) {
      aggregate {
        count
      }
    }
  }
`;

type Props = {
  communityId: number
  children: any
}

const LastFormEntries: React.FC<Props> = ({ communityId, children }) => {
  const endInterval = new Date();
  const startInterval = new Date();
  startInterval.setDate(startInterval.getDate() - 90);

  const { data, loading, error } = useQuery(totalActivistsFormEntryQuery, {
    variables: {
      community_id: communityId,
      start_interval: startInterval.toDateString(),
      end_interval: endInterval.toDateString()
    }
  });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.totalUniqActivistsByKindAndCommunityInterval.aggregate.count });
}

export default LastFormEntries;