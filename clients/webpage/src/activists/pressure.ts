import jwt from 'jsonwebtoken';

import graphql, { Response } from './request-graphql';

export type Activist = {
  firstname: string;
  lastname: string;
  email: string;
  city?: string;
  state?: string;
};

export type Payload = {
  activist: Activist;
  targets_id?: string;
  mail: any;
  form_data?: any;
};

export type Widget = {
  id: number;
};

export interface Args {
  payload: Payload;
  widget: Widget;
}

export const pressureQuery = `
  mutation Pressure($activist: ActivistInput!, $widget_id: Int!, $input: EmailPressureInput) {
    create_email_pressure(widget_id: $widget_id, activist: $activist, input: $input) {
      data
    }
  }
`;

const pressure = async ({ payload, widget }: Args): Promise<any> => {
  const { activist, targets_id, mail, form_data } = payload;

  try {
    const input: any = {
      first_name: activist.firstname,
      last_name: activist.lastname,
      name: `${activist.firstname} ${activist.lastname}`,
      email: activist.email,
    };
    if (activist.city) {
      input.city = activist.city;
    }
    if (activist.state) {
      input.state = activist.state;
    }

    const pressureInput: any = {
      targets_id,
      form_data,
      token: jwt.sign({}, process.env.ACTION_SECRET_KEY || ''),
    };

    if (mail.disableEditField !== 's') {
      pressureInput.email_subject = mail.subject;
      pressureInput.email_body = mail.body;
    }

    const variables = {
      activist: input,
      widget_id: widget.id,
      input: pressureInput,
    };

    const query = JSON.stringify({ query: pressureQuery, variables });

    const { data, errors }: Response = await graphql(query);

    if (errors) {
      console.log('data, errors', { data, errors });
      throw new Error('request_graphql_error');
    }

    return data;
  } catch (err) {
    // TODO: Show popup window error
    console.log('err', err);
  }
};

export default pressure;
