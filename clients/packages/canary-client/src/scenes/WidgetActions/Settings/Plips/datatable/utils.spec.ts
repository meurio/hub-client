import { checkStatus } from './utils';
import type { PlipForm } from './useQueryFilters';

describe('Status', () => {
  const plipForm: PlipForm = {
    name: 'teste',
    email: 'test@test.org',
    expected_signatures: 10,
    state: 'SP',
    created_at: new Date().toDateString(),
    confirmed_signatures: undefined
  }

  it('concluido', () => {
    expect(checkStatus({ ...plipForm, confirmed_signatures: 10 }))
      .toEqual('Concluído');
  });

  it('pendente 10', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 31)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 10,
      created_at: dt.toDateString()
    })).toEqual('Pendente');
  });

  it('inscrito 10', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 29)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 10,
      created_at: dt.toDateString()
    })).toEqual('Inscrito');
  });

  it('pendente 20', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 61)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 20,
      created_at: dt.toDateString()
    })).toEqual('Pendente');
  });

  it('inscrito 20', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 59)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 20,
      created_at: dt.toDateString()
    })).toEqual('Inscrito');
  });

  it('pendente 30', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 91)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 30,
      created_at: dt.toDateString()
    })).toEqual('Pendente');
  });

  it('inscrito 30', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 89)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 30,
      created_at: dt.toDateString()
    })).toEqual('Inscrito');
  });

  it('pendente 40', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 121)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 40,
      created_at: dt.toDateString()
    })).toEqual('Pendente');
  });

  it('inscrito 40', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 119)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 40,
      created_at: dt.toDateString()
    })).toEqual('Inscrito');
  });

  it('pendente 50', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 151)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 50,
      created_at: dt.toDateString()
    })).toEqual('Pendente');
  });

  it('inscrito 50', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 149)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 50,
      created_at: dt.toDateString()
    })).toEqual('Inscrito');
  });

  it('pendente 100', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 181)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 100,
      created_at: dt.toDateString()
    })).toEqual('Pendente');
  });

  it('inscrito 100', () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 179)

    expect(checkStatus({
      ...plipForm,
      confirmed_signatures: undefined,
      expected_signatures: 100,
      created_at: dt.toDateString()
    })).toEqual('Inscrito');
  });
});