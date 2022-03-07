interface Params {
  id: number;
  token: string;
}

interface Request {
  method: string
  body: Params
}

const FetchDataSubscription = async (req: Request, res: any): Promise<any> => {
  if (req.method === 'POST') {
    console.log("call api rest to ", req.body);
    return res.status(200).json({ data: {} });
  }
  return res.status(400);
}

export default FetchDataSubscription;