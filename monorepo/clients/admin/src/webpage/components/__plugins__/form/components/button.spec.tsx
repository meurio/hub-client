/* eslint-disable no-unused-expressions */
import sinon from 'sinon'
import { expect } from 'chai'
import { render, shallow } from 'enzyme'
import Button from './button';

describe('client/mobilizations/widgets/__plugins__/form/components/button', () => {
  let props: any = {
    buttonText: 'Salvar',
    handleClick: jest.fn(),
    mobilization: {}
  }

  describe('when it static', () => {
    it('should render with buttonText label', () => {
      const wrapper = render(<Button {...props} />)

      expect(wrapper.text()).to.equal(props.buttonText)
    })
  })

  describe('when it click', () => {
    it('should call handleClick when clicked button', () => {
      props.handleClick = sinon.spy()

      const wrapper = shallow(<Button {...props} />)
      wrapper.find('button').simulate('click')

      expect(props.handleClick.calledOnce).to.equal(true)
    })
  })
})
