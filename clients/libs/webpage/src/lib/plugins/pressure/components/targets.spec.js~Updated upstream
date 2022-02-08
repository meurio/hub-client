import * as React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import { Targets } from '.'

let wrapper

test.beforeEach(() => {
  wrapper = shallow(<Targets onSelect={(item) => item} />)
})

test('should render ok by default', t => {
  t.truthy(wrapper)
  t.is(wrapper.find('.target-item').length, 0)
})

test('should render .target-item according targets passed', t => {
  // jump the targets shuffle process
  wrapper.setState({ targets: ['Igor Santos <igor@nossascidades.org>'] })
  t.is(wrapper.find('.target-item').length, 1)
})

test('should render target parsed to Name <user@host.com>', t => {
  const targets = ['Igor Santos <igor@nossascidades.org>']
  // jump the targets shuffle process
  wrapper.setState({ targets })

  t.is(wrapper.find('.target-item span').at(0).text(), 'Igor Santos')
  t.is(wrapper.find('.target-item span').at(1).text(), 'igor@nossascidades.org')
})
