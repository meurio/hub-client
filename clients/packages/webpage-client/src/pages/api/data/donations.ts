import gql from 'graphql-tag';

import { client } from '../../../apis/graphql';

const query = gql`
  query ($widget_id: Int!) {
    get_widget_donation_stats(args: { widget_id: $widget_id }) {
      widget_id
      stats
    }
  }
`;

const DataDonation = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { data } = await client.query({
      fetchPolicy: 'network-only',
      query,
      variables: { widget_id: req.body.widget_id },
    });
    return res.status(200).json({ data: data.get_widget_donation_stats[0] });
  }
  return res.status(400);
};

export default DataDonation;
