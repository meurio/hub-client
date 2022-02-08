/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallow } from 'enzyme'

import TargetList from '.'

describe('client/mobilizations/widgets/__plugins__/pressure/components/target-list', () => {
  const onSelect = jest.fn();

  it('should render ok by default', () => {
    const wrapper = shallow(<TargetList onSelect={onSelect} />)
    expect(wrapper).to.be.ok
    expect(wrapper.find('.target-item').length).to.equal(0)
  })

  describe('email pressure', () => {
    it('should render .target-item according targets passed', () => {
      const wrapper = shallow(<TargetList onSelect={onSelect} />)
      // jump the targets shuffle process
      wrapper.setState({ targets: ['Igor Santos <igor@nossascidades.org>'] })
      expect(wrapper.find('.target-item').length).to.equal(1)
    })

    it('should render target parsed to Name <user@host.com>', () => {
      const wrapper = shallow(<TargetList onSelect={onSelect} />)
      const targets = ['Igor Santos <igor@nossascidades.org>']
      // jump the targets shuffle process
      wrapper.setState({ targets })

      expect(wrapper.find('.target-item span').at(0).text()).to.equal('Igor Santos')
      expect(wrapper.find('.target-item span').at(1).text()).to.equal('igor@nossascidades.org')
    })
  })

  describe('selectable', () => {
    it('should render the phone pressure label text properly', () => {
      const wrapper = shallow(<TargetList onSelect={onSelect} selectable />)
      const targets = ['Foo Bar <+551199999-9999>']
      // jump the targets shuffle process
      wrapper.setState({ targets })

      expect(wrapper.find('.target-list-label').text())
        .to.include('Quem você vai pressionar')
    })

    it('should render a checkbox on each target item', () => {
      const targets = ['Foo Bar <+551199999-9999>', 'Foo Bar <+551199999-9999>']
      const wrapper = shallow(<TargetList onSelect={onSelect} targets={targets} selectable />)

      expect(wrapper.find('.target-item').length).to.equal(2)
    })
  })
})
