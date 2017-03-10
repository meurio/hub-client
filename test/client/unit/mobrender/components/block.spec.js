import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Block from '~client/mobrender/components/block'
import Widget from '~client/mobrender/components/widget.connected'
import BlockChangeBackground from '~client/mobrender/components/block-change-background.connected'
import BlockConfigMenu from '~client/mobrender/components/block-config-menu.connected'
import { EDIT_KEY } from '~client/mobrender/components/block-config-menu'

describe('~client/mobrender/components/block', () => {
  let block
  const props = {
    block: { id: 1, bg_class: 'bg-1', hidden: false }
  }
  const blockSelector = `#block-${props.block.id}`

  beforeEach(() => {
    block = shallow(<Block {...props} />)
  })

  it('should render without crashed', () => {
    expect(block).to.be.ok
  })

  it('should make section-id with pattern `block-{id}`', () => {
    expect(block.find(blockSelector).length).to.equal(1)
  })

  it('should call onMouseOver passing key:block id:block.id', () => {
    let result
    block.setProps({ onMouseOver: (key, id) => result = { key, id } })
    block.find(blockSelector).simulate('mouseenter')
    expect(result).to.deep.equal({ key: 'block', id: props.block.id })
  })

  it('should call onMouseOut passing key:block', () => {
    let result
    block.setProps({ onMouseOut: key => result = key })
    block.find(blockSelector).simulate('mouseleave')
    expect(result).to.equal('block')
  })

  it('should call onCancelEdit when press esc', () => {
    let result
    block.setProps({ onCancelEdit: () => result = true })
    block.find(blockSelector).simulate('keyup', { keyCode: 27 })
    expect(result).to.equal(true)
  })

  it('should render hidden tag when block is hidden', () => {
    expect(block.find('div.hidden-tag').length).to.equal(0)
    block.setProps({ block: {...props.block, hidden: true } })
    expect(block.find('div.hidden-tag').length).to.equal(1)
    expect(block.find('div.hidden-tag').text()).to.equal(' Escondido')
  })

  describe('render change background', () => {
    it('should show when only editing is block-config-menu.EDIT_KEY', () => {
      expect(block.find(BlockChangeBackground).length).to.equal(0)
      block.setProps({ editing: EDIT_KEY })
      expect(block.find(BlockChangeBackground).length).to.equal(1)
    })

    it('should pass block like props', () => {
      block.setProps({ editing: EDIT_KEY })
      expect(block.find(BlockChangeBackground).props().block).to.deep.equal(props.block)
    })
  })

  describe('render config menu', () => {
    it('should render config menu passing block', () => {
      expect(block.find(BlockConfigMenu).length).to.equal(1)
      expect(block.find(BlockConfigMenu).props().block).to.deep.equal(props.block)
    })

    it('should show when hasMouseOver and editable', () => {
      expect(block.find(BlockConfigMenu).props().display).to.equal(false)

      block.setProps({ hasMouseOver: true, editable: true })
      expect(block.find(BlockConfigMenu).props().display).to.equal(true)
    })

    it('should hide when editing or saving block even with hasMouseOver and editable are true', () => {
      block.setProps({ hasMouseOver: true, editable: true })
      expect(block.find(BlockConfigMenu).props().display).to.equal(true)

      block.setProps({ editing: 'background', saving: false })
      expect(block.find(BlockConfigMenu).props().display).to.equal(false)

      block.setProps({ editing: undefined, saving: true })
      expect(block.find(BlockConfigMenu).props().display).to.equal(false)
    })
  })

  describe('render widgets', () => {
    const widgets = [
      { id: 1, kind: 'draft' },
      { id: 2, kind: 'draft' }
    ]

    beforeEach(() => {
      block.setProps({ widgets })
    })

    it('should render widgets passing widget loop', () => {
      expect(block.find(Widget).length).to.equal(2)
      widgets.forEach((w, i) => {
        const widget = block.find(Widget).at(i)
        expect(widget.props().widget).to.deep.equal(w)
      })
    })
  })
})
