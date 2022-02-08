import gql from 'graphql-tag';

import { client } from '../../../graphql-app';

const query = gql`
  query Targets($widgetId: Int!) {
    pressure_targets(
      where: { widget_id: { _eq: $widgetId } }
      order_by: { label: asc }
    ) {
      identify
      label
      targets
      email_subject
      email_body
    }
  }
`;

const DataTarget = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { data } = await client.query({
      query,
      variables: { widgetId: req.body.widget_id },
      fetchPolicy: 'no-cache',
    });

    return res.status(200).json({ data });
  }
  return res.status(400);
};

export default DataTarget;
