import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalUniqueActivistsByCommunityQuery = gql`
  query (
    $community_id: Int!,
    $start_interval: timestamp!,
    $end_interval: timestamp!
  ) {
    totalUniqueActivistsByCommunity: participations_aggregate(
      where: {
        _and: [
          { community_id: { _eq: $community_id } },
          { participate_at: { _gte: $start_interval } },
          { participate_at: { _lte: $end_interval } }
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

const LastActivists: React.FC<Props> = ({ communityId, children }) => {
  const end_interval = new Date();
  const start_interval = new Date();
  start_interval.setDate(start_interval.getDate() - 90);

  const { data, loading, error } = useQuery(totalUniqueActivistsByCommunityQuery, {
    variables: {
      community_id: communityId,
      start_interval: start_interval.toDateString(),
      end_interval: end_interval.toDateString()
    }
  });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.totalUniqueActivistsByCommunity.aggregate.count });
}

export default LastActivists;