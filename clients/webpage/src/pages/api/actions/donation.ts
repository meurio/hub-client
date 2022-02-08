import api from '../../../redux-app/apiClient';

// export type Args = {
//   fields: string;
//   widget_id: number;
// };

interface Request {
  method: 'POST' | string;
  body: any;
}

interface Response {
  status: (code: number) => any | { json: (vars: any) => any };
}

const genRequestPayload = (params: any) => ({
  widget_id: params.widget_id,
  card_hash: params.card_hash,
  payment_method: params.payment_method,
  amount: params.amount,
  customer: params.customer,
  subscription: params.subscription,
  period: params.recurring_period,
});

const ActionDonation = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const endpoint = `/mobilizations/${req.body.mobilization_id}/donations`;
    const body = { donation: genRequestPayload(req.body) };

    const result = await api.post(endpoint, body);

    return res.status(200).json({ data: result.data });
  }

  return res.status(200).json({ message: 'request GET' });
};

// const donationTransactionCreate = (params: any) => (
//   _: any,
//   __: any,
//   { api }: any
// ) => {
//   const endpoint = `/mobilizations/${params.mobilization_id}/donations`;
//   const body = { donation: genRequestPayload(params) };
//   return api.post(endpoint, body);
// };

export default ActionDonation;
