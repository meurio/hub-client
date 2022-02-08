import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalDonationsAmountQuery = gql`
  query (
    $community_id: Int!,
    $start_interval: timestamp!,
    $end_interval: timestamp!
  ) {
    totalSumSubscriptionDonationsFromCommunityInterval: donation_transactions_aggregate(
      where: {
        _and: [
          { community_id: { _eq: $community_id } },
          { payment_date: { _gte: $start_interval } },
          { payment_date: { _lte: $end_interval } },
          { transaction_status: { _eq: "paid" } }
        ]
      }
    ) {
      aggregate {
        sum {
          payable_amount
        }
      }
    }
  }
`;

type Props = {
  communityId: number
  children: any
}

const SubscriptionDonationsLastMonth: React.FC<Props> = ({ communityId, children }) => {
  const endInterval = new Date();
  const startInterval = new Date();
  startInterval.setDate(startInterval.getDate() - 30);

  const { data, loading, error } = useQuery(totalDonationsAmountQuery, {
    variables: {
      community_id: communityId,
      start_interval: startInterval.toDateString(),
      end_interval: endInterval.toDateString(),
    }
  });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.totalSumSubscriptionDonationsFromCommunityInterval.aggregate.sum.payable_amount });
}

export default SubscriptionDonationsLastMonth;