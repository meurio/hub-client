import React from 'react';
import { shallow } from 'enzyme';
import PdfButton from './PdfButton'

describe('PlipButton test', () => {

  it('should renders ok', () => {
    const wrapper = shallow(
      <PdfButton dataPdf={'https://teste'} />
    )
    expect(wrapper.props().children).toEqual('Ver ficha de assinatura')
    expect(wrapper.props().href).toBeTruthy();
    expect(wrapper).toBeTruthy();
  })
})
