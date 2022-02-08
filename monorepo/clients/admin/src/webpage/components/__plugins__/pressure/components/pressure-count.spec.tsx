import { expect } from 'chai'
import { shallow } from "enzyme";
// import { shallow } from 'intl/helpers'
import PressureCount from './pressure-count'

describe('client/mobilizations/widgets/__plugins__/pressure/components/pressure-count', () => {
  const props = {
    color: "white"
  }

  it('should render ok and total 0 by default', () => {
    const wrapper = shallow(<PressureCount {...props} />)
    const totalSpan = wrapper.find('CountUp').at(0)
    expect(totalSpan.props().end).to.equal(0)
  })

  it('should paint number with color', () => {
    const wrapper = shallow(<PressureCount color='#444' />)
    const totalSpan = wrapper.find('.h1').at(0)
    expect((totalSpan.props() as any).style.color).to.equal('#444')
  })

  it('should render CountUp with `end` prop init with 0 if counting not started', () => {
    const wrapper = shallow(<PressureCount {...props} value={420} />)
    const totalSpan = wrapper.find('CountUp').at(0)
    expect(totalSpan.props().end).to.equal(0)
  })

  it('should render CountUp with `end` prop with passed value if counting already started', () => {
    const value = 420
    const wrapper = shallow(<PressureCount {...props} value={value} startCounting />)
    const totalSpan = wrapper.find('CountUp').at(0)
    expect(totalSpan.props().end).to.equal(value)
  })

  it('should render text default pressões feitas', () => {
    const wrapper = shallow(<PressureCount {...props} />)
    wrapper.setProps({ text: undefined })
    expect(wrapper.find('span.bold').text()).to.equal('pressões feitas')
  })

  it('should render text passed', () => {
    const wrapper = shallow(<PressureCount {...props} text='pressões' />)
    expect(wrapper.find('span.bold').text()).to.equal('pressões')
  })
})
