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
  captchaCode: any;
}

interface Request {
  method: 'POST' | string;
  body: Args;
}

interface Response {
  status: (_: number) => any | { json: (vars: any) => any };
}

const ActionPressure = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    try {
      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.captchaCode}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();
      /**
       * The structure of response from the veirfy API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
       *  "error-codes": [...]        // optional
        }
       */
      if (captchaValidation.success) {
        // Replace this with the API that will save the data received
        // to your backend
        const result = await pressure(req.body);
        // Return 200 if everything is successful
        return res.status(200).json(result);
      }

      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: "Something went wrong" });
    }
  }

  return res.status(200).json({ message: 'request GET' });
};

export default ActionPressure;
