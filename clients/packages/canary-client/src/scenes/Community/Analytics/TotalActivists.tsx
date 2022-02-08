import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalActivistsQuery = gql`
  query ($community_id: Int!) {
    totalUniqueActivistsByCommunity: participations_aggregate(
      where: {
        community_id: { _eq: $community_id }
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

const TotalActivists: React.FC<Props> = ({ communityId, children }) => {
  const { data, loading, error } = useQuery(totalActivistsQuery, {
    variables: {
      community_id: communityId
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

export default TotalActivists;