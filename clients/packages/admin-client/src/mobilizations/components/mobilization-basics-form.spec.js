import React from 'react';
import shallowWithIntl from '../../intl/helpers/shallow-with-intl';
import { FormSelect } from '../../components/forms';

import * as mock from '../../utils/mock';
import { IntlProvider } from 'react-intl';

const useQueryMocked = jest.fn().mockImplementation(() => ({
  data: { subthemes: [] },
  loading: false
}));

jest.mock('bonde-core-tools', () => ({
  useQuery: useQueryMocked,
  gql: jest.fn()
}))

// eslint-disable-next-line import/first
import { MobilizationBasicsForm, validate } from '../../mobilizations/components/mobilization-basics-form';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

describe('client/mobilizations/components/mobilization-basics-form', () => {
  const props = {
    floatSubmit: false,
    fields: {
      name: {},
      goal: {},
    },
    handleSubmit: mock.noop,
    submitFailed: false,
    dirty: false,
    valid: false,
    location: { pathname: 'foobar' },
    mobilization: {
      mobilizations_subthemes: []
    }
  };

  it('should FormRedux when floatSubmit prop is false', () => {
    const wrapper = shallowWithIntl(
      <MobilizationBasicsForm {...props} intl={intl} />
    );

    expect(wrapper.find('FormRedux').length).toEqual(1);
  });

  it('should SettingsForm when floatSubmit prop is true', () => {
    const wrapper = shallowWithIntl(
      <MobilizationBasicsForm {...props} floatSubmit intl={intl} />
    );

    expect(wrapper.find('SettingsForm').length).toEqual(1);
  });

  it('should render FormSelect with subthemes', () => {
    const wrapper = shallowWithIntl(
      <MobilizationBasicsForm {...props} floatSubmit intl={intl} />
    );

    expect(wrapper.find('FormSelect').length).toEqual(1);
  });

  it('should disable subthemes field when is filled and mobilization not is new', () => {
    // const isThemeDisabled = !isNewMobilizationPath && formProps.mobilization.mobilizations_subthemes.length > 0
    const wrapper = shallowWithIntl(
      <MobilizationBasicsForm
        {...props}
        mobilization={{ ...props.mobilization, mobilizations_subthemes: [{ id: 3, label: 'Gênero' }] }}
        floatSubmit
        intl={intl}
      />
    );

    expect(wrapper.find('FormSelect').props().disabled).toEqual(true);
  });

  it('should pass fetched subthemes to FormSelect options', () => {
    const subthemes = [{ id: 3, label: 'Gênero' }];
    useQueryMocked.mockReturnValueOnce({ data: { subthemes }, loading: false });
    
    const wrapper = shallowWithIntl(
      <MobilizationBasicsForm
        {...props}
        floatSubmit
        intl={intl}
      />
    );

    expect(wrapper.find('FormSelect').props().options)
      .toEqual(subthemes.map((subtheme) => ({ value: subtheme.id, label: subtheme.label })));
  });

  it('should render FormGroup basic fields', () => {
    const wrapper = shallowWithIntl(
      <MobilizationBasicsForm
        {...props}
        floatSubmit
        intl={intl}
      />
    );

    expect(wrapper.find('FormGroup[controlId="name"]').length).toEqual(1);
    expect(wrapper.find('FormGroup[controlId="goal"]').length).toEqual(1);
    expect(wrapper.find('FormGroup[controlId="subthemes"]').length).toEqual(1);
    expect(wrapper.find('FormGroup[controlId="language"]').length).toEqual(1);
    expect(wrapper.find('FormGroup[controlId="slug"]').length).toEqual(1);
    expect(wrapper.find('FormGroup[controlId="favicon"]').length).toEqual(1);
  });

  describe("validate(values, { intl }): object", () => {

    it('should return name errors is required', () => {
      const errors = validate({}, { intl });
      expect(errors.name).toEqual('Insira o nome da mobilização');
    });

    it('should return name errors is maxLength', () => {
      const errors = validate({
        name: Array(101).fill(0).map(() => '*').join('');
      }, { intl });
      expect(errors.name).toEqual('Seu título está muito longo!');
    });

    it('should return goal errors is required', () => {
      const errors = validate({}, { intl });
      expect(errors.goal).toEqual('Insira o objetivo da mobilização');
    });

    it('should return goal errors is maxLength', () => {
      const goal = Array(501).fill(0).map(() => '*').join('');
      const errors = validate({
        goal: goal
      }, { intl });
      expect(errors.goal).toEqual('O limite de caracteres foi atingido.');
    });

    it('should return slug errors is maxLength', () => {
      const errors = validate({
        slug: Array(64).fill(0).map(() => '*').join('')
      }, { intl });
      expect(errors.slug).toEqual('Seu identificador único está muito longo!');
    });
  });
});
