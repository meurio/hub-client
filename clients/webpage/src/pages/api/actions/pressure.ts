import { pressure } from '../../../activists';

export type Activist = {
  firstname: string;
  lastname: string;
  email: string;
  city?: string;
  state?: string;
};

export type Mail = {
  disableEditField?: 's' | 'n';
  subject: string;
  body: string;
};

export type Payload = {
  activist: Activist;
  targets_id?: string;
  mail: Mail;
  form_data: any;
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
  body: Args;
}

interface Response {
  status: (code: number) => any | { json: (vars: any) => any };
}

const ActionPressure = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const result = await pressure(req.body);
    return res.status(200).json(result);
  }

  return res.status(200).json({ message: 'request GET' });
};

export default ActionPressure;
