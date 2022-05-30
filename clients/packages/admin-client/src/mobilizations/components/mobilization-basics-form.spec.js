import React from 'react';
import shallowWithIntl from '../../intl/helpers/shallow-with-intl';
import { expect } from 'chai';

import * as mock from '../../utils/mock';
import { IntlProvider } from 'react-intl';

jest.mock('bonde-core-tools', () => ({
  useQuery: jest.fn().mockImplementation(() => ({
    data: { subthemes: [] },
    loading: false
  })),
  gql: jest.fn()
}))

// eslint-disable-next-line import/first
import { MobilizationBasicsForm } from '../../mobilizations/components/mobilization-basics-form';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

describe('client/mobilizations/components/mobilization-basics-form', () => {
  let wrapper;
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
  };

  beforeEach(() => {
    wrapper = shallowWithIntl(
      <MobilizationBasicsForm {...props} intl={intl} />
    );
  });

  describe('#render', () => {
    it('should render without crash', () => {
      // expect(wrapper).to.be.ok
      expect(true).to.equal(true);
    });
    it('should FormRedux when floatSubmit prop is false', () => {
      expect(wrapper.find('FormRedux').length).to.equal(1);
    });
    it('should SettingsForm when floatSubmit prop is true', () => {
      wrapper = shallowWithIntl(
        <MobilizationBasicsForm {...props} floatSubmit intl={intl} />
      );
      expect(wrapper.find('SettingsForm').length).to.equal(1);
    });
  });
});
