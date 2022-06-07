/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TranslateContext } from '../../../components/MobilizationClass';
import Form from '../components/Form';
import EmailFields from '../Email/EmailFields';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

const renderFormPlugin = (props: any) => render(
  <TranslateContext.Provider value={{ t: (key: string) => key, Trans: () => <div />, i18n: { language: 'pt-BR' } }}>
    <Form {...props} />
  </TranslateContext.Provider>
);

const FormI18n = (props: any) => (
  <TranslateContext.Provider value={{ t: (key: string) => key, Trans: () => <div /> }}>
    <Form {...props} />
  </TranslateContext.Provider>
);

describe('Pressure Form', function () {
  const widget = {
    id: 1,
    count: 0,
    settings: {
      title_text: 'Form Title',
      button_text: 'Send form',
      pressure_subject: 'Pressure Subject',
      pressure_body: 'Pressure Body',
      targets: 'Target 1 <target1@test.org>;Target 2 <target1@test.org>;',
      show_city: 'city-false',
      main_color: '#f08585',
    },
  };

  const targetList = [
    'Viviane <viviane@gmail.com>',
    'Camila <caamila@gmail.com>',
    'Lucas <lucas@gmail.com>',
    'Meire <teste@gmail.com',
    'Teste <testes2@gmail.com',
  ];

  const onBlur = jest.fn();

  const props = {
    onSubmit: () => 'onSubmit',
    widget,
    pureTargets: [],
    saving: false,
    BeforeStandardFields: () => EmailFields.before(targetList, onBlur),
    AfterStandardFields: () => (
      <EmailFields.after disableSubjectAndBody={true} />
    ),
    errors: [],
  };

  it('should render form', () => {
    const wrapper = shallow(<FormI18n {...props} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render button text when not submitting or saving form', () => {
    const { container, getAllByText } = renderFormPlugin(props);

    expect(container.querySelector('button[type="submit"]')).toBeInTheDocument();
    expect(getAllByText(widget.settings.button_text)).toHaveLength(1);
  });

  it('should render button "Enviando..." when saving form', () => {
    const { container, getAllByText } = renderFormPlugin({ ...props, saving: true });

    expect(container.querySelector('button[type="submit"]')).toBeInTheDocument();
    expect(getAllByText('Pressure Saving')).toHaveLength(1);
  });

  // it('should render button "Enviando..." when submitting form', () => {
  //   const { container, getAllByText } = renderFormPlugin({ ...props });

  //   expect(container.querySelector('button[type="submit"]')).toBeInTheDocument();
  //   expect(getAllByText('Pressure Saving')).toHaveLength(1);
  // });

  it('should render noTargetsError if passed', () => {
    const noTargetsError = 'select any target to continue';
    const { getAllByText } = renderFormPlugin({ ...props, errors: [noTargetsError] });

    expect(getAllByText(noTargetsError)).toHaveLength(1);
  });

  // it('should pass onSubmit and initialValues to ConnectedForm', () => {
  //   const { getAllByText } = renderFormPlugin(props);
  //   expect(getAllByText(widget.settings.pressure_subject)).toHaveLength(1);
  //   expect(getAllByText(widget.settings.pressure_body)).toHaveLength(1);
  // });

  it('should render essential fields', () => {
    const { container } = renderFormPlugin(props);

    expect(container.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="lastname"]')).toBeInTheDocument();
  });

  // it('check if onBlur func is being called', async () => {
  //   const { container } = renderFormPlugin(props);
  //   const email = container.querySelector(
  //     'input[name="email"]'
  //   ) as HTMLInputElement;
  //   fireEvent.blur(email);
  //   await waitFor(() => {
  //     expect(onBlur).toHaveBeenCalledTimes(1);
  //   });
  // });
});
