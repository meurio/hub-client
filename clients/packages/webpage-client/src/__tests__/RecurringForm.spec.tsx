import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'bonde-components/form';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

const rechargeSpy = jest.fn();
jest.mock('../apis/rest/recharge', () => rechargeSpy);

import RecurringForm from '../components/subscriptions/RecurringForm';

describe('RecurringForm tests', () => {
  const properties = {
    id: 78,
    token: '1234jasdb-asdads2-asdat553'
  }

  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should be renders ok', () => {
    const wrapper = shallow(<RecurringForm {...properties} />);

    expect(wrapper).toBeTruthy();
  })

  it('should call recharge on submit', () => {
    const wrapper = shallow(<RecurringForm {...properties} />);
    wrapper.find(Form).simulate('submit')

    expect(rechargeSpy.mock.calls.length).toEqual(1);
    expect(rechargeSpy.mock.calls[0][0]).toEqual(properties);
  })
})