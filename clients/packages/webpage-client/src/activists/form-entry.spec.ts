import { mocked } from 'ts-jest/utils';
import formEntry, { Args, formEntryQuery, fillActivist } from './form-entry';
import graphql from './request-graphql';

jest.mock('./request-graphql');
const mockedGraphql = mocked(graphql);

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

describe('activists module form entry tests', () => {
  const args: Args = {
    fields: JSON.stringify([]),
    widget_id: 3464
  };

  it('should throw error when fields json is empty', () => {
    return formEntry(args)
      .catch((err: any) => {
        expect(err.message).toEqual('fields is empty');
      });
  });

  it('should make a query to called graphql api with input args', () => {
    mockedGraphql.mockResolvedValue({ data: { form_entry_id: 3847 } });
    const fields = [
      {
        uid: "field-1552312909841-49",
        kind: "text",
        label: "Nome",
        placeholder: "Insira seu nome",
        required: 'true',
        value: "Fabricio Copola"
      },
      {
        uid: "field-1552312920353-15",
        kind: "email",
        label: "Email",
        placeholder: "Insira seu e-mail",
        required: 'true',
        value: "fabricio@copola.org"
      },
      {
        uid: "field-1552312933368-45",
        kind: "dropdown",
        label: "Região onde reside",
        placeholder: "Norte,Nordeste,Centro-Oeste,Sudeste,Sul",
        required: 'true',
        value: "Norte"
      }
    ];

    return formEntry({
      ...args,
      fields: JSON.stringify(fields)
    }).then(() => {
      const variables = {
        activist: {
          first_name: fields[0].value,
          email: fields[1].value,
          name: fields[0].value
        },
        input: { fields: fields.map(field => ({ ...field, required: field.required === 'true' ? true : false })) },
        widget_id: args.widget_id
      };

      expect(mockedGraphql).toBeCalledWith(JSON.stringify({
        query: formEntryQuery,
        variables
      }));
    });
  });

  it('should be pattern to get name and first_name', () => {
    // Name, Nome, Nombre, Firstname, First-Name
    const name = {
      uid: "field-1552312920353-15",
      kind: "text",
      label: "Name",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "Fabricio Copola"
    };
    const email = {
      uid: "field-1552312920353-15",
      kind: "email",
      label: "Email",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "fabricio@copola.org"
    };

    expect(fillActivist([email, name])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value
    });

    expect(fillActivist([email, { ...name, label: 'Nome' }])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value
    });

    expect(fillActivist([email, { ...name, label: 'Nombre' }])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value
    });

    expect(fillActivist([email, { ...name, label: 'Firstname' }])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value
    });

    expect(fillActivist([email, { ...name, label: 'First-name' }])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value
    });
  });

  it('should be pattern to get name and last_name', () => {
    // Name, Nome, Nombre, Firstname, First-Name
    const name = {
      uid: "field-1552312920353-15",
      kind: "text",
      label: "FirstName",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "Fabricio"
    };
    const email = {
      uid: "field-1552312920353-15",
      kind: "email",
      label: "Email",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "fabricio@copola.org"
    };
    const lastName = {
      uid: "field-1552312920353-15",
      kind: "text",
      label: "LastName",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "Copola"
    };

    expect(fillActivist([email, name, lastName])).toEqual({
      first_name: name.value,
      name: `${name.value} ${lastName.value}`,
      email: email.value,
      last_name: lastName.value
    });

    expect(fillActivist([email, name, { ...lastName, label: 'Surname' }])).toEqual({
      first_name: name.value,
      name: `${name.value} ${lastName.value}`,
      email: email.value,
      last_name: lastName.value
    });

    expect(fillActivist([email, name, { ...lastName, label: 'Apellido' }])).toEqual({
      first_name: name.value,
      name: `${name.value} ${lastName.value}`,
      email: email.value,
      last_name: lastName.value
    });

    expect(fillActivist([email, name, { ...lastName, label: 'Sobrenome' }])).toEqual({
      first_name: name.value,
      name: `${name.value} ${lastName.value}`,
      email: email.value,
      last_name: lastName.value
    });
  });

  it('should be pattern to get email', () => {
    // Name, Nome, Nombre, Firstname, First-Name
    const name = {
      uid: "field-1552312920353-15",
      kind: "text",
      label: 'name',
      placeholder: "Insira seu e-mail",
      required: true,
      value: "Fabricio"
    };
    const email = {
      uid: "field-1552312920353-15",
      kind: "email",
      label: "email",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "fabricio@copola.org"
    };

    expect(fillActivist([email, name])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value
    });

    expect(fillActivist([{ ...email, label: 'E-mail' }, name])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value
    });

    expect(fillActivist([{ ...email, label: 'Correo Electronico' }, name])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value
    });

    expect(fillActivist([{ ...email, label: 'Correo Electrónico' }, name])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value
    });
  });

  it('should be pattern to get phone', () => {
    // Name, Nome, Nombre, Firstname, First-Name
    const name = {
      uid: "field-1552312920353-15",
      kind: "text",
      label: "FirstName",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "Fabricio"
    };
    const email = {
      uid: "field-1552312920353-15",
      kind: "email",
      label: "Email",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "fabricio@copola.org"
    };
    const phone = {
      uid: "field-1552312920353-15",
      kind: "text",
      label: "celular",
      placeholder: "Insira seu celular",
      required: true,
      value: "31991177656"
    };

    expect(fillActivist([email, name, phone])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value,
      phone: phone.value
    });

    expect(fillActivist([email, name, { ...phone, label: 'mobile' }])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value,
      phone: phone.value
    });

    expect(fillActivist([email, name, { ...phone, label: 'portable' }])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value,
      phone: phone.value
    });
  });

  it('should be pattern to get city', () => {
    // Name, Nome, Nombre, Firstname, First-Name
    const name = {
      uid: "field-1552312920353-15",
      kind: "text",
      label: "FirstName",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "Fabricio"
    };
    const email = {
      uid: "field-1552312920353-15",
      kind: "email",
      label: "Email",
      placeholder: "Insira seu e-mail",
      required: true,
      value: "fabricio@copola.org"
    };
    const city = {
      uid: "field-1552312920353-15",
      kind: "text",
      label: "cidade",
      placeholder: "Insira sua cidade",
      required: true,
      value: "Belo Horizonte"
    };

    expect(fillActivist([email, name, city])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value,
      city: city.value
    });

    expect(fillActivist([email, name, { ...city, label: 'City' }])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value,
      city: city.value
    });

    expect(fillActivist([email, name, { ...city, label: 'Ciudad' }])).toEqual({
      first_name: name.value,
      name: name.value,
      email: email.value,
      city: city.value
    });
  });
});