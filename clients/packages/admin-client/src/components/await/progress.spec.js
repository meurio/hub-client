import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Progress from './progress'

describe('client/components/await/progress', () => {
  describe('#render', () => {
    it('should render unselected and bind onClick event', () => {
      const wrapper = shallow(<Progress className='foobar' percent={34} />)

      expect(wrapper.props().children.props.className).to.equal('foobar')
      expect(wrapper.props().children.props.style).to.deep.equal({ width: '34%' })
    })
  })
})
