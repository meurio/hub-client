/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Background } from 'components/layout'

describe('client/components/layout/background', () => {
  it('should render without crashed', () => {
    const bg = mount(<Background />)
    expect(bg).to.be.ok
  })

  it('should render div with bg classes', () => {
    const className = 'bg-reboo bg-center bg-cover absolute top-0 right-0 bottom-0 left-0'
    const bg = mount(<Background />)
    const main = bg.find('div').at(0)
    expect(main.props().className).to.equal(className)
  })

  it('should render children in content div', () => {
    const bg = mount(
      <Background>
        <h1>LoremIpsum</h1>
      </Background>
    )
    const cell = bg.find('.content')
    expect(cell.find('h1').length).to.equal(1)
  })

  it('should render inner div with colunm size 3 by default', () => {
    const className = 'col-3'
    const bg = mount(<Background />)
    expect(bg.find('.content').props().className).to.contain(className)
  })

  it('should render inner div with colunm size class', () => {
    const className = 'col-5'
    const bg = mount(<Background contentSize={5} />)
    expect(bg.find('.content').props().className).to.contain(className)
  })

  it('should render image in background', () => {
    const style = {
      backgroundImage: "url('../assets/bg-login.png')",
      overflow: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    }
    const bg = mount(<Background image='../assets/bg-login.png' />)
    expect(bg.find('.bg-cover').props().style).to.deep.equal(style)
  })
})
