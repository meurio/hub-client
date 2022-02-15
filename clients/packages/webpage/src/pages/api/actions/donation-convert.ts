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

export default async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const endpoint = `/convert-donation`;
    const result = await api.get(endpoint, { params: req.body });

    return res.status(200).json({ data: result.data });
  }

  return res.status(200).json({ message: 'request GET' });
};
