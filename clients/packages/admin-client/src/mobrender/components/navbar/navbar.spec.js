import React from 'react'
import { expect } from 'chai'

import { mountWithIntl } from 'intl/helpers'
import Navbar from 'mobrender/components/navbar'
import MenuItems from 'mobrender/components/navbar/menu-items'

describe('client/mobrender/components/navbar', () => {
  let wrapper
  const props = {
    editable: false,
    mobilization: {},
    blocks: [
      {
        id: 1,
        hidden: false,
        menu_hidden: false
      },
      {
        id: 2,
        hidden: true,
        menu_hidden: false
      },
      {
        id: 3,
        menu_hidden: true
      }
    ]
  }

  beforeEach(() => {
    wrapper = mountWithIntl(<Navbar {...props} />)
  })

  it('renders absolute layout by default', () => {
    expect(wrapper.find('.absolute.col-12.z3').length).to.equal(1)
  })

  it('should render desktop and mobile version', () => {
    expect(wrapper.find(MenuItems).at(0).props().mobile).to.equal(false)
    expect(wrapper.find(MenuItems).at(1).props().mobile).to.equal(true)
  })

  describe('when is editable', () => {
    beforeEach(() => {
      wrapper.setProps({ editable: true })
    })

    it('should passed to <Menu /> visible blocks', () => {
      const blocks = props.blocks.filter(b => !b.hidden)
      wrapper.find(MenuItems).map(menu => {
        expect(menu.props().blocks).to.deep.equal(blocks)
      })
    })
  })

  describe('when isnt editable', () => {
    beforeEach(() => {
      wrapper.setProps({ editable: false })
    })

    it('should passed to <Menu /> only visible blocks menu', () => {
      const blocks = props.blocks.filter(b => !b.hidden && !b.menu_hidden)
      wrapper.find(MenuItems).map(menu => {
        expect(menu.props().blocks).to.deep.equal(blocks)
      })
    })
  })
})
