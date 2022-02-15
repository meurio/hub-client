import { FormAnalytics } from '../bonde-webpage';
import { Activist } from './pressure';
import graphql, { Response } from './request-graphql';

type FormEntryField = {
  uid: string;
  kind: string;
  label: string;
  placeholder: string;
  required: boolean;
  value: string;
};

type FieldPattern = {
  name: string;
  re: any;
};

type Input = {
  fields: FormEntryField[];
};

export type Args = {
  fields: string;
  widget_id: number;
};

export const formEntryQuery = `
mutation FormEntry($activist: ActivistInput!, $widget_id: Int!, $input: FormEntryInput!) {
  create_form_entry(widget_id: $widget_id, activist: $activist, input: $input) {
    data
  }
}
`;

export const fillActivist = (fields: FormEntryField[]): Activist => {
  // console.log('fields', { fields });
  const activist: any = {};
  // Create activist input with label regex
  const fieldsPattners: FieldPattern[] = [
    {
      name: 'first_name',
      re: new RegExp(
        /(nombre|first[-\s]?name|seu nome|nome|name|primeiro[-\s]?nome)/,
        'g'
      ),
    },
    {
      name: 'last_name',
      re: new RegExp(
        /(sobre[\s-]?nome|seu sobre[\s-]?nome|surname|last[\s-]?name|apellido)/,
        'g'
      ),
    },
    {
      name: 'email',
      re: new RegExp(/(e-?mail|correo electr(o|ó)nico)|email/, 'g'),
    },
    {
      name: 'phone',
      re: new RegExp(/(celular|mobile|portable|whatsapp)/, 'g'),
    },
    { name: 'city', re: new RegExp(/(cidade|city|ciudad)/) },
  ];
  fieldsPattners.forEach(({ name, re }: FieldPattern) => {
    const field = fields.filter((f) => re.test(f.label.toLowerCase()))[0];
    if (field) {
      activist[name] = field.value;
    }
  });
  // console.log('fields', { fields });
  // console.log('activist', { activist });
  // Concat activist fullname
  activist.name = `${activist.first_name.trim()} ${(
    activist.last_name || ''
  ).trim()}`.trim();

  return activist;
};

export default async ({
  fields: fieldsJSON,
  widget_id,
}: Args): Promise<any> => {
  const input: Input = {
    fields: JSON.parse(fieldsJSON).map((field: any) => ({
      ...field,
      required: field.required === 'true',
    })),
  };

  if (input.fields.length < 1) throw new Error('fields is empty');

  const activist = fillActivist(input.fields);

  const query = JSON.stringify({
    query: formEntryQuery,
    variables: { activist, input, widget_id },
  });
  const { data, errors }: Response = await graphql(query);

  if (data) {
    FormAnalytics.formSavedData();
    return Promise.resolve(data);
  }

  return Promise.reject(errors);
};
