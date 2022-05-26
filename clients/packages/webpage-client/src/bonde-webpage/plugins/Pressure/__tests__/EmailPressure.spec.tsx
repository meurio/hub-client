import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TranslateContext } from '../../../components/MobilizationClass';
import { EmailPressure as EmailPlugin } from '../Email';
import { getTargetList } from '../utils';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const widget = {
  action_community: false,
  action_opportunity: false,
  block_id: 14180,
  count: 0,
  created_at: '2020-01-24T13:43:37.438-03:00',
  donations_count: 0,
  exported_at: null,
  form_entries_count: 0,
  goal: null,
  id: 24307,
  kind: 'pressure',
  lg_size: 6,
  match_list: [],
  md_size: 6,
  settings: {
    count_text: 'pressões',
    button_text: 'Send Email',
    disable_edit_field: 'n',
    main_color: '#f23392',
    pressure_body: 'Corpo da mensagem',
    pressure_subject: 'Assunto',
    show_city: 'city-true',
    show_state: 's',
    title_text: 'Send an email to anyone who can make this decision',
    targets: 'Viviane <vivi@email.com>;Camila <camila@email.com>',
  },
};
const overrides = {
  // eslint-disable-next-line react/display-name
  FinishCustomMessage: { component: () => <div>nice!</div>, props: {} },
  FinishDefaultMessage: {
    // eslint-disable-next-line react/display-name
    component: () => <div>compartilhe!</div>,
    props: { imageUrl: 'bla', href: 'https://www.mapalgbt.bonde.org' },
  },
};
const block = {
  bg_class: null,
  bg_image: null,
  created_at: '2020-01-24T13:43:37.374-03:00',
  deleted_at: null,
  hidden: null,
  id: 14180,
  menu_hidden: null,
  mobilization_id: 1378,
  name: null,
  offsetTop: 0,
  position: 1,
  updated_at: '2020-01-24T13:43:37.374-03:00',
};

const analyticsEvents = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  pressureIsFilled: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  pressureSavedData: () => { },
};

const targetsList = getTargetList(widget.settings.targets);

const renderEmailPlugin = (props: any) => render(
  // eslint-disable-next-line react/display-name
  <TranslateContext.Provider value={{ t: (key: string) => key, Trans: () => <div />, i18n: { language: 'pt-BR' } }}>
    <EmailPlugin {...props} />
  </TranslateContext.Provider>
);

describe('Plugin needs to render', () => {
  const props = {
    widget: {
      ...widget,
      settings: {
        ...widget.settings,
        optimization_enabled: false
      }
    },
    pressureTargets: [],
    editable: false,
    overrides,
    analyticsEvents,
    asyncFillWidget: async () => ({ widget: {} }),
    mobilization: {},
    block
  };

  it('should render Header with correct text content', () => {
    const { getByText } = renderEmailPlugin(props);
    const header = getByText(/send an email/i);
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(
      'Send an email to anyone who can make this decision'
    );
  });

  it('should render a list of targets according to the targetsList length', () => {
    const { getAllByText } = renderEmailPlugin(props);
    const targets = getAllByText(/@/i);
    expect(targets).toHaveLength(targetsList.length);
  });

  it("should render an input with name 'email'", () => {
    const { container } = renderEmailPlugin(props);
    const email = container.querySelector('input[name="email"]');
    expect(email).toBeInTheDocument();
  });

  it('should render certain inputs', () => {
    const { container } = renderEmailPlugin(props);
    const name = container.querySelector('input[name="name"]');
    expect(name).toBeInTheDocument();
    const lastname = container.querySelector('input[name="lastname"]');
    expect(lastname).toBeInTheDocument();
    const city = container.querySelector('input[name="city"]');
    expect(city).toBeInTheDocument();
    const subject = container.querySelector('input[name="subject"]');
    expect(subject).toBeInTheDocument();
    const body = container.querySelector('textarea[name="body"]');
    expect(body).toBeInTheDocument();
  });

  it("subject and body fields shouldn't be disabled", () => {
    const { container } = renderEmailPlugin(props);
    const subject = container.querySelector('input[name="subject"]');
    const body = container.querySelector('textarea[name="body"]');
    expect(subject).not.toBeDisabled();
    expect(body).not.toBeDisabled();
  });

  it("subject and body fields be disabled when optimization_enabled is truth", () => {
    const { container } = renderEmailPlugin({
      ...props,
      widget: {
        ...props.widget,
        settings: {
          ...props.widget.settings,
          disable_edit_field: "n",
          optimization_enabled: true
        }
      }
    });
    const subject = container.querySelector('input[name="subject"]');
    const body = container.querySelector('textarea[name="body"]');
    expect(subject).toBeDisabled();
    expect(body).toBeDisabled();
  });

  it('should render the count component if there is a count_text', () => {
    const { getByText } = renderEmailPlugin(props);
    expect(getByText(/pressões/i)).toBeInTheDocument();
  });
});

describe('Plugin successful behavior paths', () => {
  const mockedValues = {
    name: 'Teste',
    lastname: 'Sobrenome Teste',
    city: 'São Paulo',
    state: "SP",
    subject: 'Vou te pressionar!',
    body: 'Estou te pressionando :@',
    email: 'test@email.com',
  };
  const handleSubmit = jest
    .fn()
    .mockResolvedValue({ create_email_pressure: { id: 2134 } });
  const props = {
    widget,
    editable: false,
    overrides,
    analyticsEvents,
    asyncFillWidget: handleSubmit,
    mobilization: {},
    block,
  };

  it('should change input value accordingly', () => {
    const { container } = renderEmailPlugin(props);

    const name = container.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const lastname = container.querySelector(
      'input[name="lastname"]'
    ) as HTMLInputElement;
    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const city = container.querySelector(
      'input[name="city"]'
    ) as HTMLInputElement;
    const state = container.querySelector(
      'select[name="state"]'
    ) as HTMLInputElement;
    const subject = container.querySelector(
      'input[name="subject"]'
    ) as HTMLInputElement;
    const body = container.querySelector(
      'textarea[name="body"]'
    ) as HTMLInputElement;

    fireEvent.change(name, { target: { value: mockedValues.name } });
    fireEvent.change(lastname, { target: { value: mockedValues.lastname } });
    fireEvent.change(email, { target: { value: mockedValues.email } });
    fireEvent.change(city, { target: { value: mockedValues.city } });
    fireEvent.change(state, { target: { value: mockedValues.state } });
    fireEvent.change(subject, { target: { value: mockedValues.subject } });
    fireEvent.change(body, { target: { value: mockedValues.body } });

    expect(name.value).toBe(mockedValues.name);
    expect(lastname.value).toBe(mockedValues.lastname);
    expect(email.value).toBe(mockedValues.email);
    expect(city.value).toBe(mockedValues.city);
    expect(state.value).toBe(mockedValues.state);
    expect(subject.value).toBe(mockedValues.subject);
    expect(body.value).toBe(mockedValues.body);
  });

  it('should submit form with expected values and have a successful submit', async () => {
    const { container, getByText, queryByText } = renderEmailPlugin(props);
    const payload = {
      activist: {
        firstname: mockedValues.name,
        lastname: mockedValues.lastname,
        email: mockedValues.email,
        city: mockedValues.city || null,
        state: mockedValues.state || null,
      },
      targets_id: undefined,
      mail: {
        // cc: targetsList.map((target: string) => getEmailTarget(target)),
        disableEditField: widget.settings.disable_edit_field,
        subject: mockedValues.subject,
        body: mockedValues.body,
      },
      form_data: {
        name: mockedValues.name,
        lastname: mockedValues.lastname,
        email: mockedValues.email,
        city: mockedValues.city || null,
        state: mockedValues.state || null,
        subject: mockedValues.subject,
        body: mockedValues.body
      }
    };

    const name = container.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const lastname = container.querySelector(
      'input[name="lastname"]'
    ) as HTMLInputElement;
    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const city = container.querySelector(
      'input[name="city"]'
    ) as HTMLInputElement;
    const state = container.querySelector(
      'select[name="state"]'
    ) as HTMLInputElement;
    const subject = container.querySelector(
      'input[name="subject"]'
    ) as HTMLInputElement;
    const body = container.querySelector(
      'textarea[name="body"]'
    ) as HTMLInputElement;
    const submitButton = getByText(/send email/i);

    fireEvent.change(name, { target: { value: mockedValues.name } });
    fireEvent.change(lastname, { target: { value: mockedValues.lastname } });
    fireEvent.change(email, { target: { value: mockedValues.email } });
    fireEvent.change(city, { target: { value: mockedValues.city } });
    fireEvent.change(subject, { target: { value: mockedValues.subject } });
    fireEvent.change(body, { target: { value: mockedValues.body } });
    fireEvent.change(state, { target: { value: mockedValues.state } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    const submitting = getByText(/Pressure Saving/i);
    expect(submitting).toBeInTheDocument();

    expect(handleSubmit).toBeCalledWith({ payload, widget });
    await waitFor(() => {
      expect(submitting).not.toBeInTheDocument();
    });

    expect(queryByText(/Pressure Network Failed/i)).toBeFalsy();

    await waitFor(() => {
      expect(getByText(/compartilhe!/i)).toBeInTheDocument();
    });
  });
});

describe('Plugin unsuccessful behavior paths', () => {
  const mockedValues = {
    name: 'Teste',
    lastname: 'Sobrenome Teste',
    city: 'São Paulo',
    subject: 'Vou te pressionar!',
    body: 'Estou te pressionando :@',
    email: 'test@email.com',
  };
  const handleSubmit = jest
    .fn()
    .mockRejectedValue({ type: 'UPDATE_WIDGET_SUCCESS' });
  const props = {
    widget: {
      ...widget,
      settings: {
        ...widget.settings,
        targets: '',
        show_city: 'city-false',
        show_state: 'n',
        disable_edit_field: 's',
        count_text: undefined,
      },
    },
    editable: false,
    overrides,
    analyticsEvents,
    asyncFillWidget: handleSubmit,
    mobilization: {},
    block,
  };

  it('should not render the count component if there isnt a count_text', () => {
    const { queryByText } = renderEmailPlugin(props);
    expect(queryByText(/pressões/i)).not.toBeInTheDocument();
  });

  it('should return an error if there are no set targets', async () => {
    const { container, getByText } = renderEmailPlugin(props);
    const name = container.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const lastname = container.querySelector(
      'input[name="lastname"]'
    ) as HTMLInputElement;
    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const submitButton = getByText(/send email/i);

    fireEvent.change(name, { target: { value: mockedValues.name } });
    fireEvent.change(lastname, { target: { value: mockedValues.lastname } });
    fireEvent.change(email, { target: { value: mockedValues.email } });
    fireEvent.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
    // const submitting = getByText(/enviando/i);
    // expect(submitting).toHaveTextContent('Enviando...');

    await waitFor(() => {
      expect(submitButton).toHaveTextContent('Send Email');
    });

    const error = getByText(/Pressure TargetBlank Validation/i);
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(
      'Pressure TargetBlank Validation'
    );
  });

  it('should not display city field if show_city is false', () => {
    const { container } = renderEmailPlugin(props);
    const city = container.querySelector('input[name="city"]');
    expect(city).toBeFalsy();
  });

  test('subject and body input should be disabled', () => {
    const { container } = renderEmailPlugin(props);
    const subject = container.querySelector(
      'input[name="subject"]'
    ) as HTMLInputElement;
    const body = container.querySelector(
      'textarea[name="body"]'
    ) as HTMLInputElement;
    expect(subject).toBeDisabled();
    expect(body).toBeDisabled();
  });

  it('should display validation error messages', async () => {
    const { container, getByText, getAllByText } = renderEmailPlugin({
      ...props,
      widget: {
        ...props.widget,
        settings: {
          ...props.widget.settings,
          targets: 'Viviane <vivi@email.com>;Camila <camila@email.com>',
        }
      }
    });

    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const submitButton = getByText(/send email/i);

    fireEvent.change(email, { target: { value: 'error_email' } });
    fireEvent.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();

    const required = getAllByText(/Pressure Blank Validation/i);
    expect(required).toHaveLength(2);
    const emailInvalid = getByText(/Pressure Email Validation/i);
    expect(emailInvalid).toHaveTextContent('Pressure Email Validation');
  });

  it('should display error if email input is present in targets', async () => {
    const { container, getByText } = renderEmailPlugin({
      ...props,
      widget: {
        ...props.widget,
        settings: {
          ...props.widget.settings,
          targets: 'Viviane <vivi@email.com>;Camila <camila@email.com>',
        },
      }
    });
    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const submitButton = getByText(/send email/i);

    fireEvent.change(email, { target: { value: 'vivi@email.com' } });
    fireEvent.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();

    const list = getByText(/Pressure SameEmailTarget Validation/i);
    expect(list).toHaveTextContent(
      'Pressure SameEmailTarget Validation'
    );
  });

  test('submit form should have an unsuccessful submit', async () => {
    const { container, getByText, queryByText } = renderEmailPlugin({
      ...props,
      widget: {
        ...props.widget,
        settings: {
          ...props.widget.settings,
          targets: 'Viviane <vivi@email.com>;Camila <camila@email.com>',
        },
      }
    });

    const name = container.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const lastname = container.querySelector(
      'input[name="lastname"]'
    ) as HTMLInputElement;
    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const submitButton = getByText(/send email/i);

    fireEvent.change(name, { target: { value: mockedValues.name } });
    fireEvent.change(lastname, { target: { value: mockedValues.lastname } });
    fireEvent.change(email, { target: { value: mockedValues.email } });
    fireEvent.click(submitButton);

    expect(submitButton).toHaveTextContent('Pressure Saving');
    expect(handleSubmit).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(submitButton).not.toHaveTextContent('Pressure Saving');
    });

    expect(queryByText(/Pressure Network Failed/i)).toBeTruthy();
  });
});
