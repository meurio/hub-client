import React from 'react';
import { render, shallow } from 'enzyme';
import { Button } from '../components';

describe('Form Button', function() {
  const buttonText = 'Enviar';

  it('should render button', () => {
    const wrapper = shallow(<Button buttonText={buttonText} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render to static HTML', function() {
    expect(render(<Button buttonText={buttonText} />).text()).toEqual('Enviar');
  });
});
