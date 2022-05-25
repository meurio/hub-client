import React from 'react';
import { shallow } from 'enzyme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn()
  })
}))

const authenticateSpy = jest.fn((values: any) => ({ data: {} }));

jest.mock('bonde-core-tools', () => ({
  useQuery: () => [authenticateSpy],
  useMutation: () => [authenticateSpy],
  gql: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    search: ''
  })
}));

import ResetPasswordPage from './ResetPasswordPage/index';
import ResetPasswordForm from './ResetPasswordPage/Form';

describe('ResetPasswordPage tests', () => {

  it('should be render is ok', () => {
    const wrapper = shallow(<ResetPasswordPage />);

    expect(wrapper).toBeTruthy();
  })

  xit('should call verifyTokenQuery when submit ResetPasswordForm', () => {
    const values = { field1: 'value1' };
    const wrapper = shallow(<ResetPasswordPage />);

    wrapper.find(ResetPasswordForm).props().onSubmit(values)

    expect(authenticateSpy.mock.calls[0][0]).toEqual({
      variables: values
    });
  })
})