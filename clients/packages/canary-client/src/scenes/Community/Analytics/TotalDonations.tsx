import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalDonationsQuery = gql`

query (
  $community_id: Int!
) {
  paid: donation_transactions_aggregate(
    where: {
      _and: [
        { community_id: { _eq: $community_id } },
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

  waiting_payment: donation_transactions_aggregate(
    where: {
      _and: [
        { community_id: { _eq: $community_id } },
        { transaction_status: { _eq: "waiting_payment" } }
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

const TotalDonations: React.FC<Props> = ({ communityId, children }) => {
  const { data, loading, error } = useQuery(totalDonationsQuery, {
    variables: { community_id: communityId }
  });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({
    total: data.paid.aggregate.sum.payable_amount,
    waiting: data.waiting_payment.aggregate.sum.payable_amount
  });
}

export default TotalDonations;