import plip from '../../../activists/plip';

export type Activist = {
  firstname: string;
  lastname: string;
  email: string;
  city?: string;
  state?: string;
};

export type Payload = {
  email: string;
  pdf_data: any;
  state: string
};

export type Widget = {
  id: number;
};

export interface Args {
  payload: Payload;
  widget: Widget;
}

interface Request {
  method: 'POST' | string;
  body: any;
}

interface Response {
  status: (_code: number) => any | { json: (_vars: any) => any };
}

const ActionPlip = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const result = await plip(req.body);
    return res.status(200).json(result);
  }

  return res.status(200).json({ message: 'request GET' });
};

export default ActionPlip;
