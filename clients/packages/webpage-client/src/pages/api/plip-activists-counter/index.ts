import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../apis/graphql';
import { gql } from '@apollo/client';

const query = gql`
query {
  plips_aggregate(where: {widget_id: {_eq: 70801}}, distinct_on: unique_identifier) {
    aggregate {
      sum {
        id
      }
    }
  }
}
`

export default async function fetchSignatures(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req;
  if (method === "GET") {
    const signaturesTotal = await client.query({
      query,
      fetchPolicy: "no-cache"
    })
    return res.status(200).json({
      data: signaturesTotal
    })
  }
}
